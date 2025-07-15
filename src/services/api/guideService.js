import prerequisitesData from "@/services/mockData/prerequisites.json";
import stepsData from "@/services/mockData/steps.json";
import proTipsData from "@/services/mockData/proTips.json";

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const getPrerequisites = async () => {
  await delay(300);
  return [...prerequisitesData];
};

export const getSteps = async () => {
  await delay(350);
  return [...stepsData];
};

export const getProTips = async () => {
  await delay(400);
  return [...proTipsData];
};

export const getPrerequisiteById = async (id) => {
  await delay(200);
  return prerequisitesData.find(item => item.Id === parseInt(id));
};

export const getStepById = async (id) => {
  await delay(200);
  return stepsData.find(item => item.Id === parseInt(id));
};

export const getProTipById = async (id) => {
  await delay(200);
  return proTipsData.find(item => item.Id === parseInt(id));
};