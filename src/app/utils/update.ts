import { extend } from 'immutability-helper';

import { Context } from 'immutability-helper';


const UpdateContext = new Context();


const updateInternal = UpdateContext.update

extend('$auto', function(value, object) {
  return object ?
    updateInternal(object, value):
    updateInternal({}, value);
});
extend('$autoArray', function(value, object) {
  return object ?
    updateInternal(object, value):
    updateInternal([], value);
});

export const update = updateInternal;
