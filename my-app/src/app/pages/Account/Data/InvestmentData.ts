export interface InvestmentData {
  projectId: number;
  project: string;
  numberOfShare: number;
  pricePerShare: number;
}

export const sampleData: InvestmentData[] = [
  {
    projectId: 1,
    project: 'Gochie',
    numberOfShare: 10000,
    pricePerShare: 100000,
  },
  {
    projectId: 2,
    project: 'IzHouse',
    numberOfShare: 100,
    pricePerShare: 100000,
  },
  {
    projectId: 3,
    project: 'Dichvule',
    numberOfShare: 100,
    pricePerShare: 100000,
  },
  {
    projectId: 4,
    project: 'EarlyBird',
    numberOfShare: 100,
    pricePerShare: 100000,
  },
  {
    projectId: 5,
    project: 'Mystikos',
    numberOfShare: 100,
    pricePerShare: 100000,
  },
  {
    projectId: 6,
    project: 'Game',
    numberOfShare: 100,
    pricePerShare: 100000,
  },
];
