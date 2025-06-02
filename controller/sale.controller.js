const prisma = require('../prisma/client');
const apiResponse  = require('../utils/apiResponse');
const { status } = require("http-status");
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
    return apiResponse.success(
      res,
      sales,
      'Sales retrieved successfully',
      status.OK,
    );
  } catch (error) {
    console.error('Error retrieving sales:', error);
    return apiResponse.error(
      res,
      'Failed to retrieve sales',
      status.INTERNAL_SERVER_ERROR,
    );
  }
};

exports.getRevenueSummary = async (req, res) => {
  try {
    const { period, startDate, endDate } = req.query;
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
    return apiResponse.success(res,{ period, summary: formattedSummary }, 'Revenue summary retrieved successfully', status.OK);
  } catch (error) {
    console.error('Error retrieving revenue summary:', error);
    return apiResponse.error(res, 'Failed to retrieve revenue summary', status.INTERNAL_SERVER_ERROR);
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

    const filters = (firstStartDate, firstEndDate) => ({
      saleDate: {
        gte: new Date(firstStartDate),
        lte: new Date(firstEndDate),
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
const data = {
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
    }
    return apiResponse.success(res, data, 'Revenue comparison successful', status.OK);

  } catch (error) {
    console.error('Error comparing revenue:', error);
    return apiResponse.error(res, 'Failed to compare revenue', status.INTERNAL_SERVER_ERROR);
  }
};
