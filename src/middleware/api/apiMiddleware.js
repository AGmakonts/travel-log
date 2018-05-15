import Service from './Service';

export function apiAction(action) {

  const ACTION_TEMPLATE = `${action}.API_MIDDLEWARE`;

  return {
    PRE: `${ACTION_TEMPLATE}.PRE`,
    POST: `${ACTION_TEMPLATE}.POST`,
    SUCCESS: `${ACTION_TEMPLATE}.SUCCESS`,
    ERROR: `${ACTION_TEMPLATE}.ERROR`
  };
}

export default function apiMiddleware(services: Service[]) {

  return store => next => action => {

    const actionType = action.type;

    const PRE = apiAction(actionType).PRE;
    const POST = apiAction(actionType).POST;
    const SUCCESS = apiAction(actionType).SUCCESS;
    const ERROR = apiAction(actionType).ERROR;

    next(action);
    services.forEach((service: Service) => {
      if (service.trigger === action.type) {
        next({type: PRE, origin: action.payload});
        service.handle(action)
          .then(response => {
            next({type: SUCCESS, payload: response, origin: action});
          })
          .catch(error => {
            next({type: ERROR, payload: error, origin: action});
          })
          .finally(() => {
            next({type: POST, origin: action});
          });
      }
    });
  }
}