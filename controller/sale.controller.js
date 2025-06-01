const prisma = require('../prisma/client');

exports.getSales = async (req, res) => {
  try {
    const { startDate, endDate, productId, categoryId } = req.query;

    const filters = {};
    if (startDate && endDate) {
      filters.saleDate = {
        gte: new Date(startDate),
        lte: new Date(endDate),
      };
    }
    if (productId) {
      filters.productId = parseInt(productId);
    }
    if (categoryId) {
      filters.product = {
        categoryId: parseInt(categoryId),
      };
    }

    const sales = await prisma.sale.findMany({
      where: filters,
      include: {
        product: true,
      },
    });

    res.status(200).json({ sales });
  } catch (error) {
    console.error('Error retrieving sales:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getRevenueSummary = async (req, res) => {
  try {
    const { period, startDate, endDate } = req.query;

    if (!['daily', 'weekly', 'monthly', 'yearly'].includes(period)) {
      return res.status(400).json({ error: 'Invalid period parameter' });
    }

    const sales = await prisma.sale.findMany({
      where: {
        saleDate: {
          gte: startDate ? new Date(startDate) : undefined,
          lte: endDate ? new Date(endDate) : undefined,
        },
      },
    });

    const summary = {};

    sales.forEach((sale) => {
      let key;
      const date = new Date(sale.saleDate);
      switch (period) {
        case 'daily':
          key = date.toISOString().split('T')[0];
          break;
        case 'weekly':
          const weekStart = new Date(date);
          weekStart.setDate(date.getDate() - date.getDay());
          key = weekStart.toISOString().split('T')[0];
          break;
        case 'monthly':
          key = `${date.getFullYear()}-${(date.getMonth() + 1)
            .toString()
            .padStart(2, '0')}`;
          break;
        case 'yearly':
          key = date.getFullYear().toString();
          break;
      }

      if (!summary[key]) {
        summary[key] = 0;
      }
      summary[key] += parseFloat(sale.totalPrice);
    });

    const formattedSummary = Object.entries(summary).map(
      ([periodStart, totalRevenue]) => ({
        periodStart,
        totalRevenue,
      })
    );

    res.status(200).json({ period, summary: formattedSummary });
  } catch (error) {
    console.error('Error retrieving revenue summary:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.compareRevenue = async (req, res) => {
  try {
    const {
      firstStartDate,
      firstEndDate,
      secondStartDate,
      secondEndDate,
      categoryId,
    } = req.query;

    if (
      !firstStartDate ||
      !firstEndDate ||
      !secondStartDate ||
      !secondEndDate
    ) {
      return res
        .status(400)
        .json({ error: 'All date parameters are required' });
    }

    const filters = (startDate, endDate) => ({
      saleDate: {
        gte: new Date(startDate),
        lte: new Date(endDate),
      },
      ...(categoryId && {
        product: {
          categoryId: parseInt(categoryId),
        },
      }),
    });

    const [firstPeriodSales, secondPeriodSales] = await Promise.all([
      prisma.sale.findMany({
        where: filters(firstStartDate, firstEndDate),
        include: {
          product: true,
        },
      }),
      prisma.sale.findMany({
        where: filters(secondStartDate, secondEndDate),
        include: {
          product: true,
        },
      }),
    ]);

    const sumTotalPrice = (sales) =>
      sales.reduce((sum, sale) => sum + parseFloat(sale.totalPrice), 0);

    const firstTotal = sumTotalPrice(firstPeriodSales);
    const secondTotal = sumTotalPrice(secondPeriodSales);
    const difference = secondTotal - firstTotal;
    const percentageChange =
      firstTotal === 0 ? null : (difference / firstTotal) * 100;

    res.status(200).json({
      comparison: {
        firstPeriod: {
          startDate: firstStartDate,
          endDate: firstEndDate,
          totalRevenue: firstTotal,
        },
        secondPeriod: {
          startDate: secondStartDate,
          endDate: secondEndDate,
          totalRevenue: secondTotal,
        },
        difference,
        percentageChange,
      },
    });
  } catch (error) {
    console.error('Error comparing revenue:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
