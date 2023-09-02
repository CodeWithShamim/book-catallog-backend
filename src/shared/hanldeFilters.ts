/* eslint-disable @typescript-eslint/no-explicit-any */
const handleFilters = (filters: any, searchFields: string[]) => {
  const { search, ...filtersData } = filters;
  const andConditons = [];

  if (filtersData.minPrice || filtersData.maxPrice) {
    const minPrice = Number(filtersData.minPrice) || 0;
    const maxPrice = Number(filtersData.maxPrice) || 1000000;

    andConditons.push({
      AND: [
        {
          price: {
            gte: minPrice,
          },
        },
        {
          price: {
            lte: maxPrice,
          },
        },
      ],
    });
  }

  // search
  if (search) {
    andConditons.push({
      OR: searchFields.map((field: string) => ({
        [field]: {
          contains: search,
          mode: 'insensitive',
        },
      })),
    });
  }

  delete filtersData.minPrice;
  delete filtersData.maxPrice;

  // filters;
  // if (Object.keys(filtersData).length > 0) {
  //   andConditons.push({
  //     AND: Object.keys(filtersData).map(key => ({
  //       [key]: {
  //         equals: (filtersData as any)[key],
  //         mode: 'insensitive',
  //       },
  //     })),
  //   });
  // }

  const whereConditions = andConditons.length > 0 ? { AND: andConditons } : {};

  return whereConditions;
};

export default handleFilters;
