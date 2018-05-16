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



  return ({ dispatch, getState }) => {
    return (next) => (action) => {

      const actionType = action.type;
      const result = next(action);
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
          service.handle(action, getState())
            .then(response => {
              dispatch({type: SUCCESS, payload: response, origin: action}, next);
            })
            .catch(error => {
              dispatch({type: ERROR, payload: error, origin: action}, next);

            })
            .finally(() => {
              dispatch({type: POST, origin: action}, next);
            });
        }

        return result;
      });
    }
  }

}