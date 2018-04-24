import { ShadowDOMEmulation } from "./runtime/templating/shadow-dom";
import { ICompiledViewSource } from "./runtime/templating/view-engine";

//this object is built up during compilation
export const nameTagConfig: ICompiledViewSource = {
  name: 'name-tag',
  hasSlots: true,
  template: `
    <header>Super Duper name tag</header>
    <div>
      <input type="text" class="au"><br/>
      <span class="au" style="font-weight: bold; padding: 10px 0;"></span>
    </div>
    <hr/>
    <div>
      <label>
        Name tag color:
        <select class="au">
          <option>red</option>
          <option>green</option>
          <option>blue</option>
        </select>
      </label>
    </div>
    <hr/>
    <div>
      <label>
        Name tag border color:
        <select class="au">
          <option>orange</option>
          <option>black</option>
          <option>rgba(0,0,0,0.5)</option>
        </select>
      </label>
      <slot class="au"></slot>
    </div>
    <hr/>
    <div>
      <label>
        Name tag border width:
        <input type="number" class="au" min="1" step="1" max="10" />
      </label>
    </div>
    <div>
      <label>
        Show header:
        <input type="checkbox" class="au" />
      </label>
    </div>
    <button class="au">Reset</button>
  `,
  targetInstructions: [
    [
      {
        type: 'twoWay',
        source: 'name',
        target: 'value'
      }
    ],
    [
      {
        type: 'oneWay',
        source: 'name',
        target: 'textContent'
      },
      {
        type: 'style',
        source: 'nameTagColor',
        target: 'color'
      }
    ],
    [
      {
        type: 'twoWay',
        source: 'nameTagColor',
        target: 'value'
      }
    ],
    [
      {
        type: 'twoWay',
        source: 'nameTagBorderColor',
        target: 'value'
      }
    ],
    [
      {
        type: 'slot',
        name: ShadowDOMEmulation.defaultSlotName
      }
    ],
    [
      {
        type: 'twoWay',
        source: 'nameTagBorderWidth',
        target: 'value'
      }
    ],
    [
      {
        type: 'twoWay',
        source: 'nameTagHeaderVisible',
        target: 'checked'
      }
    ],
    [
      {
        type: 'listener',
        source: 'click',
        target: 'submit',
        preventDefault: true,
        strategy: 0
      }
    ]
  ],
  surrogateInstructions: [
    {
      type: 'style',
      source: 'nameTagBorder',
      target: 'border'
    },
    {
      type: 'oneWay',
      source: 'nameTagClasses',
      target: 'className'
    }
  ]
};