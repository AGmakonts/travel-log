import Service from './Service';

export function apiAction(action, service: Service) {


  const name = service.name || service.constructor.name;
  const interceptorPrefix = `@@apiInterceptor/`;
  action = action.replace(interceptorPrefix,'');
  const ACTION_TEMPLATE = `${interceptorPrefix}${name}`;

  return {
    PRE: `${ACTION_TEMPLATE}.PRE/${action}`,
    POST: `${ACTION_TEMPLATE}.POST/${action}`,
    SUCCESS: `${ACTION_TEMPLATE}.SUCCESS/${action}`,
    ERROR: `${ACTION_TEMPLATE}.ERROR/${action}`
  };
}

export default function apiMiddleware(services: Service[]) {

  let handle = function (action, next) {
    const actionType = action.type;



    next(action);
    services.forEach((service: Service) => {

      const PRE = apiAction(actionType, service).PRE;
      const POST = apiAction(actionType, service).POST;
      const SUCCESS = apiAction(actionType, service).SUCCESS;
      const ERROR = apiAction(actionType, service).ERROR;

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