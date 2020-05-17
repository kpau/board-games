import { getControllerConfig, setControllerConfig } from '../config';

export default function route(path?: string): ClassDecorator {
  return function routeDecorator<TClass extends Function>(ctrl: TClass): void {
    let routePath: string;

    if (path === undefined) {
      const endIndex = ctrl.name.indexOf('Controller');
      const name = endIndex < 0
        ? ctrl.name
        : ctrl.name.substring(0, endIndex);

      routePath = name.toLowerCase();
    } else {
      routePath = path;
    }


    const ctrlConfig = getControllerConfig<typeof ctrl.prototype>(ctrl);
    ctrlConfig.path = routePath;
    ctrlConfig.actions = ctrlConfig.actions || [];
    setControllerConfig(ctrl, ctrlConfig);
  };
}
