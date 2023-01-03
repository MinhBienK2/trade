export interface ProjectData {
  projectId: number;
  project: string;
  price: number;
  totalShare: number;
  totalValue: number;
  maxTradingShare: number;
  maxTradingValue: number;
  currentTradingShare: number;
  currentTradingValue: number;
}

export interface ValueSelectForm {
  value: string;
  label: string;
}

export const sampleProjectData: ProjectData[] = [
  {
    projectId: 0,
    project: 'Gochie',
    price: 100000,
    totalShare: 10000,
    totalValue: 1000000000,
    maxTradingShare: 3000,
    maxTradingValue: 300000000,
    currentTradingShare: 0,
    currentTradingValue: 0,
  },
  {
    projectId: 1,
    project: 'Godoo',
    price: 130000,
    totalShare: 10000,
    totalValue: 1000000000,
    maxTradingShare: 3000,
    maxTradingValue: 300000000,
    currentTradingShare: 0,
    currentTradingValue: 0,
  },
  {
    projectId: 2,
    project: 'Dichvule',
    price: 9000,
    totalShare: 5000,
    totalValue: 500000000,
    maxTradingShare: 1500,
    maxTradingValue: 150000000,
    currentTradingShare: 0,
    currentTradingValue: 0,
  },
  {
    projectId: 3,
    project: 'IzHouse',
    price: 140000,
    totalShare: 5000,
    totalValue: 500000000,
    maxTradingShare: 1500,
    maxTradingValue: 150000000,
    currentTradingShare: 0,
    currentTradingValue: 0,
  },
  {
    projectId: 4,
    project: 'EarlyBird',
    price: 120000,
    totalShare: 15000,
    totalValue: 1500000000,
    maxTradingShare: 45000,
    maxTradingValue: 450000000,
    currentTradingShare: 0,
    currentTradingValue: 0,
  },
  {
    projectId: 5,
    project: 'Mystikos',
    price: 110000,
    totalShare: 15000,
    totalValue: 1500000000,
    maxTradingShare: 45000,
    maxTradingValue: 450000000,
    currentTradingShare: 0,
    currentTradingValue: 0,
  },
  {
    projectId: 6,
    project: 'Game',
    price: 150000,
    totalShare: 18000,
    totalValue: 1800000000,
    maxTradingShare: 54000,
    maxTradingValue: 540000000,
    currentTradingShare: 0,
    currentTradingValue: 0,
  },
];

export function getProjectData(projectId: number): ProjectData | undefined {
  for (let i = 0; i < sampleProjectData.length; i++) {
    if (sampleProjectData[i].projectId == projectId) {
      return sampleProjectData[i];
    }
  }
  return undefined;
}

export function getProjectNameList(): ValueSelectForm[] {
  let data = new Array<ValueSelectForm>();
  for (let i = 0; i < sampleProjectData.length; i++) {
    data.push({
      value: String(sampleProjectData[i].projectId),
      label: sampleProjectData[i].project,
    });
  }
  return data;
}
