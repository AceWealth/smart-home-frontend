/**
 * Copyright 2019, Google, Inc.
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *   http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { DeviceType } from './device-type';

let instance;

const type = 'action.devices.types.DEHYDRATOR'

class Dehydrator extends DeviceType {
  constructor() {
    super()
    this.valuesArray = [{
      nicknames: ['My food dehydrator'],
      roomHint: 'Kitchen',
    }];
  }

  static createDevice() {
    if (!instance) {
      instance = new Dehydrator()
    }
    const element = instance.valuesArray.shift();

    return {
      id: instance.genUuid(),
      type,
      traits: [
        'action.devices.traits.Cook',
        'action.devices.traits.StartStop',
        'action.devices.traits.Timer',
      ],
      defaultNames: [`Smart Dehydrator`],
      name: `Smart Dehydrator`,
      nicknames: instance.getNicknames(element),
      roomHint: instance.getRoomHint(element),
      attributes: {
        supportedCookingModes: [
          'DEHYDRATE',
        ],
        foodPresets: [{
          food_preset_name: 'beef jerky',
          supported_units: ['POUNDS', 'OUNCES'],
          food_synonyms: [{
            synonym: ['beef jerky', 'jerky'],
            lang: 'en',
          }],
        }, {
          food_preset_name: 'beet chips',
          supported_units: ['POUNDS', 'OUNCES'],
          food_synonyms: [{
            synonym: ['beet chips', 'beets'],
            lang: 'en',
          }],
        }],
        maxTimerLimitSec: 30,
        pausable: true,
      },
      willReportState: true,
      states: {
        online: true,
        timerRemainingSec: -1,
        timerPaused: false,
        isRunning: false,
        isPaused: false,
        currentCookingMode: 'NONE',
        currentFoodPreset: 'NONE',
        currentFoodQuantity: 0,
        currentFoodUnit: 'NO_UNITS',
      },
      hwVersion: '1.0.0',
      swVersion: '2.0.0',
      model: 'L',
      manufacturer: 'L',
    };
  }
}

window.deviceTypes.push({
  type,
  identifier: '_addDehydrator',
  icon: 'device:gps-fixed',
  label: 'Dehydrator',
  function: (app) => {
    app._createDevice(Dehydrator.createDevice());
  },
})
