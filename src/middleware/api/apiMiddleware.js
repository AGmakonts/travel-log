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

  let handle = function (action, next) {
    const actionType = action.type;

    const PRE = apiAction(actionType).PRE;
    const POST = apiAction(actionType).POST;
    const SUCCESS = apiAction(actionType).SUCCESS;
    const ERROR = apiAction(actionType).ERROR;

    next(action);
    services.forEach((service: Service) => {

      const currentServiceTrigger = service.trigger;
      const isComposite = Array.isArray(currentServiceTrigger);
      const compositeContainsAction = currentServiceTrigger.indexOf(actionType) !== -1;
      const canHandleAsComposite = isComposite && compositeContainsAction;
      const canHandleAsSimple = currentServiceTrigger === actionType;
      const canHandle = canHandleAsComposite || canHandleAsSimple;

      if (canHandle) {
        next({type: PRE, origin: action.payload});
        service.handle(action)
          .then(response => {
            handle({type: SUCCESS, payload: response, origin: action}, next);
          })
          .catch(error => {
            handle({type: ERROR, payload: error, origin: action}, next);

          })
          .finally(() => {
            handle({type: POST, origin: action}, next);
          });
      }
    });
  };


  return store => next => action => {

    handle(action, next);
  }
}