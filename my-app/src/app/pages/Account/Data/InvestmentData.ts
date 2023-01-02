export interface InvestmentData {
  projectId: number;
  project: string;
  numberOfShare: number;
  pricePerShare: number;
  totalValue: number;
}
export const sampleData: InvestmentData[] = [
  {
    projectId: 1,
    project: 'Gochie',
    numberOfShare: 10000,
    pricePerShare: 100000,
    totalValue: 1000000000,
  },
  {
    projectId: 2,
    project: 'IzHouse',
    numberOfShare: 100,
    pricePerShare: 100000,
    totalValue: 10000000,
  },
  {
    projectId: 3,
    project: 'Dichvule',
    numberOfShare: 100,
    pricePerShare: 100000,
    totalValue: 10000000,
  },
  {
    projectId: 4,
    project: 'EarlyBird',
    numberOfShare: 100,
    pricePerShare: 100000,
    totalValue: 10000000,
  },
  {
    projectId: 5,
    project: 'Mystikos',
    numberOfShare: 100,
    pricePerShare: 100000,
    totalValue: 10000000,
  },
  {
    projectId: 6,
    project: 'Game',
    numberOfShare: 100,
    pricePerShare: 100000,
    totalValue: 10000000,
  },
];

export function getInvestmentData(
  projectId: number,
): InvestmentData | undefined {
  for (let i = 0; i < sampleData.length; i++) {
    if (sampleData[i].projectId == projectId) {
      return sampleData[i];
    }
  }
  return undefined;
}
