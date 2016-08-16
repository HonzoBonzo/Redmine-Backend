var express = require('express');
var projectController = require('./../controllers/projects.controller');
var userController = require('./../controllers/users.controller');
var featureController = require('./../controllers/features.controller');
var featureStatusController = require('./../controllers/featureStatuses.controller');
var featurePriorityController = require('./../controllers/featurePriorities.controller');
var featureCategoryController = require('./../controllers/featureCategories.controller');
var taskController = require('./../controllers/tasks.controller');
var taskStatusController = require('./../controllers/taskStatuses.controller');
var taskPriorityController = require('./../controllers/taskPriorities.controller');
var taskCategoryController = require('./../controllers/taskCategories.controller');
var taskTrackerController = require('./../controllers/taskTracker.controller');
var optionController = require('./../controllers/options.controller');
var authRouter = require('../../auth/routes/auth.router');

projectManagerRouter = express.Router();


projectManagerRouter.get(/^\/project\/([0-9_]+)$/, projectController.getProject);
projectManagerRouter.put(/^\/project\/([0-9_]+)$/, projectController.updateProject);
projectManagerRouter.delete(/^\/project\/([0-9_]+)$/, projectController.deleteProject);
projectManagerRouter.get('/project/', projectController.getAllProjects);
projectManagerRouter.post('/project/', projectController.createProject);
// projectManagerRouter.get('/project/pages/', projectController.getRecordsAmount);
// projectManagerRouter.get(/^\/project\/pages\/([0-9_]+)\/([0-9_]+)$/, projectController.getLoadPagesSearch);
// projectManagerRouter.get(/^\/project\/pages\/([0-9_]+)\/([0-9_]+)\/(.*)$/, projectController.getLoadPagesSearchExp);
projectManagerRouter.get(/^\/project\/pages\/([0-9_]+)\/([0-9_]+)\/([a-zA-Z0-9]*)\/sorted\/([a-zA-Z]+)$/, projectController.getAllProjectsWithExpSorted);
// projectManagerRouter.get(/^\/project\/change\/(.*)$/, projectController.getChangeList);
projectManagerRouter.get(/^\/project\/check\/([0-9_]+)$/, projectController.checkRelations);


projectManagerRouter.get(/^\/users\/([0-9_]+)$/, userController.getUserById);
projectManagerRouter.post(/^\/users\/update/, userController.updateUser);
projectManagerRouter.delete(/^\/users\/([0-9_]+)$/, userController.deleteUser);
projectManagerRouter.get('/users/', userController.getAllUsers);
projectManagerRouter.post('/users/register', userController.createUser);
projectManagerRouter.post('/users/auth', userController.getUserBy);
projectManagerRouter.post('/users/check', userController.checkLoginFree);
projectManagerRouter.post('/users/all', userController.getAllUsersWithExpSorted);


projectManagerRouter.get(/^\/features\/([0-9_]+)$/, featureController.getFeature);
projectManagerRouter.put(/^\/features\/([0-9_]+)$/, featureController.updateFeature);
projectManagerRouter.delete(/^\/features\/([0-9_]+)$/, featureController.deleteFeature);
projectManagerRouter.get('/features/', featureController.getAllFeatures);
projectManagerRouter.post('/features/', featureController.createFeature);
projectManagerRouter.get('/features/project', featureController.getProjects);
projectManagerRouter.get(/^\/features\/project\/(.+)$/, featureController.getProjectsExp);
projectManagerRouter.get('/features/users', featureController.getUsers);
projectManagerRouter.get(/^\/features\/users\/(.+)$/, featureController.getUsersExp);
//projectManagerRouter.get(/^\/features\/pages\/([0-9_]+)\/([0-9_]+)$/, featureController.getAllFeaturesNoExp);
projectManagerRouter.get(/^\/features\/pages\/([0-9_]+)\/([0-9_]+)\/([a-zA-Z0-9]*)\/sorted\/([a-zA-Z]+)$/, featureController.getAllFeaturesWithExpSorted);
projectManagerRouter.get(/^\/features\/check\/([0-9_]+)$/, featureController.checkRelations);

projectManagerRouter.get(/^\/status\/([0-9_]+)$/, featureStatusController.getStatus);
projectManagerRouter.put(/^\/status\/([0-9_]+)$/, featureStatusController.updateStatus);
projectManagerRouter.delete(/^\/status\/([0-9_]+)$/, featureStatusController.deleteStatus);
projectManagerRouter.get('/status/', featureStatusController.getAllStatuses);
projectManagerRouter.post('/status/', featureStatusController.createStatus);

projectManagerRouter.get(/^\/category\/([0-9_]+)$/, featureCategoryController.getCategory);
projectManagerRouter.put(/^\/category\/([0-9_]+)$/, featureCategoryController.updateCategory);
projectManagerRouter.delete(/^\/category\/([0-9_]+)$/, featureCategoryController.deleteCategory);
projectManagerRouter.get('/category/', featureCategoryController.getAllCategories);
projectManagerRouter.post('/category/', featureCategoryController.createCategory);

projectManagerRouter.get(/^\/priority\/([0-9_]+)$/, featurePriorityController.getPriority);
projectManagerRouter.put(/^\/priority\/([0-9_]+)$/, featurePriorityController.updatePriority);
projectManagerRouter.delete(/^\/priority\/([0-9_]+)$/, featurePriorityController.deletePriority);
projectManagerRouter.get('/priority/', featurePriorityController.getAllPriorities);
projectManagerRouter.post('/priority/', featurePriorityController.createPriority);


projectManagerRouter.get(/^\/tasks\/([0-9_]+)$/, taskController.getTask);
projectManagerRouter.put(/^\/tasks\/([0-9_]+)$/, taskController.updateTask);
projectManagerRouter.delete(/^\/tasks\/([0-9_]+)$/, taskController.deleteTask);
projectManagerRouter.get('/tasks/', taskController.getAllTasks);
projectManagerRouter.post('/tasks/', taskController.createTask);
projectManagerRouter.get('/tasks/features', taskController.getFeatures);
projectManagerRouter.get(/^\/tasks\/features\/(.+)$/, taskController.getFeaturesExp);
projectManagerRouter.get('/tasks/users', taskController.getUsers);
projectManagerRouter.get(/^\/tasks\/users\/(.+)$/, taskController.getUsersExp);
//projectManagerRouter.get(/^\/tasks\/pages\/([0-9_]+)\/([0-9_]+)$/, taskController.getAllTasksNoExp);
//projectManagerRouter.get(/^\/tasks\/pages\/([0-9_]+)\/([0-9_]+)\/(.+)$/, taskController.getAllTasksWithExp);
projectManagerRouter.get(/^\/tasks\/pages\/([0-9_]+)\/([0-9_]+)\/([a-zA-Z0-9]*)\/sorted\/([a-zA-Z]+)$/, taskController.getAllTasksWithExpSorted);
projectManagerRouter.post('/tasks\/pages\/sorted\/filtered/', taskController.getAllTasksWithExpSortedFiltered); //with filters
//projectManagerRouter.get(/^\/tasks\/pages\/([0-9_]+)\/([0-9_]+)\/\/sorted\/([a-zA-Z]+)$/, taskController.getAllTasksNoExpSorted);


projectManagerRouter.get(/^\/tasks\/status\/([0-9_]+)$/, taskStatusController.getStatus);
projectManagerRouter.put(/^\/tasks\/status\/([0-9_]+)$/, taskStatusController.updateStatus);
projectManagerRouter.delete(/^\/tasks\/status\/([0-9_]+)$/, taskStatusController.deleteStatus);
projectManagerRouter.get('/tasks\/status/', taskStatusController.getAllStatuses);
projectManagerRouter.post('/tasks\/status/', taskStatusController.createStatus);


projectManagerRouter.get(/^\/tasks\/category\/([0-9_]+)$/, taskCategoryController.getCategory);
projectManagerRouter.put(/^\/tasks\/category\/([0-9_]+)$/, taskCategoryController.updateCategory);
projectManagerRouter.delete(/^\/tasks\/category\/([0-9_]+)$/, taskCategoryController.deleteCategory);
projectManagerRouter.get('/tasks\/category/', taskCategoryController.getAllCategories);
projectManagerRouter.post('/tasks\/category/', taskCategoryController.createCategory);


projectManagerRouter.get(/^\/tasks\/priority\/([0-9_]+)$/, taskPriorityController.getPriority);
projectManagerRouter.put(/^\/tasks\/priority\/([0-9_]+)$/, taskPriorityController.updatePriority);
projectManagerRouter.delete(/^\/tasks\/priority\/([0-9_]+)$/, taskPriorityController.deletePriority);
projectManagerRouter.get('/tasks\/priority/', taskPriorityController.getAllPriorities);
projectManagerRouter.post('/tasks\/priority/', taskPriorityController.createPriority);

projectManagerRouter.get(/^\/tasks\/tracker\/([0-9_]+)$/, taskTrackerController.getTracker);
projectManagerRouter.put(/^\/tasks\/tracker\/([0-9_]+)$/, taskTrackerController.updateTracker);
projectManagerRouter.delete(/^\/tasks\/tracker\/([0-9_]+)$/, taskTrackerController.deleteTracker);
projectManagerRouter.get('/tasks\/tracker/', taskTrackerController.getAllTrackers);
projectManagerRouter.post('/tasks\/tracker/', taskTrackerController.createTracker);



projectManagerRouter.put(/^\/options\/([0-9_]+)$/, optionController.updateOption);
projectManagerRouter.delete(/^\/options\/([0-9_]+)$/, optionController.deleteOption);
projectManagerRouter.post('/options/', optionController.createOption);
projectManagerRouter.get(/^\/options\/check\/([0-9_]+)$/, optionController.checkRelations);

module.exports = projectManagerRouter;
