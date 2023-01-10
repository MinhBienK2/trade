export interface InvestmentData {
  projectId: number;
  nameProject: string;
  numberOfSharesPurchased: number;
  pricePerShare: number;
}

export const sampleData: InvestmentData[] = [
  {
    projectId: 0,
    nameProject: 'Gochie',
    numberOfSharesPurchased: 10000,
    pricePerShare: 100000,
  },
  {
    projectId: 1,
    nameProject: 'Godoo',
    numberOfSharesPurchased: 100,
    pricePerShare: 100000,
  },
  {
    projectId: 2,
    nameProject: 'Dichvule',
    numberOfSharesPurchased: 100,
    pricePerShare: 100000,
  },
  {
    projectId: 3,
    nameProject: 'IzHouse',
    numberOfSharesPurchased: 100,
    pricePerShare: 100000,
  },
  {
    projectId: 4,
    nameProject: 'EarlyBird',
    numberOfSharesPurchased: 100,
    pricePerShare: 100000,
  },
  {
    projectId: 5,
    nameProject: 'Mystikos',
    numberOfSharesPurchased: 100,
    pricePerShare: 100000,
  },
  {
    projectId: 6,
    nameProject: 'Game',
    numberOfSharesPurchased: 100,
    pricePerShare: 100000,
  },
];
