/* eslint-disable @typescript-eslint/no-explicit-any */
const handleFilters = (filters: any, searchFields: string[]) => {
  const { search, ...filtersData } = filters;
  const andConditons = [];

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

  // filters
  if (Object.keys(filtersData).length > 0) {
    andConditons.push({
      AND: Object.keys(filtersData).map(key => ({
        [key]: {
          equals: (filtersData as any)[key],
          mode: 'insensitive',
        },
      })),
    });
  }

  const whereConditions = andConditons.length > 0 ? { AND: andConditons } : {};

  return whereConditions;
};

export default handleFilters;
