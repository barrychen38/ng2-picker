import { BScroll } from '../better-scroll/bscroll';
import EventEmitter from './util/eventEmitter';
import { extend } from './util/lang';
import { addEvent } from './util/dom';

export class Picker extends EventEmitter {
  constructor(options) {
    super();

    this.options = {
      container: '',
      data: [],
      selectedIndex: null,
      showCls: 'show'
    };

    extend(this.options, options);

    this.data = this.options.data;
    this.container = this.options.container;

    this.pickerEl = document.getElementById(this.container);
    this.wheelEl = this.pickerEl.getElementsByClassName('wheel-hook');
    this.panelEl = this.pickerEl.getElementsByClassName('panel-hook')[0];
    this.scrollEl = this.pickerEl.getElementsByClassName('wheel-scroll-hook');

    this._init();
  }

  _init() {
    this.selectedIndex = [];
    this.selectedVal = [];
    if (this.options.selectedIndex) {
      this.selectedIndex = this.options.selectedIndex;
    } else {
      for (let i = 0; i < this.data.length; i++) {
        this.selectedIndex[i] = 0;
      }
    }
    this.show();
    this._bindEvent();
  }

  _bindEvent() {
    addEvent(this.pickerEl, 'touchmove', (e) => {
      e.preventDefault();
    });
  }

  _createWheel(wheelEl, i) {
    this.wheels[i] = new BScroll(wheelEl[i], {
      wheel: true,
      selectedIndex: this.selectedIndex[i]
    });
    ((index) => {
      this.wheels[index].on('scrollEnd', () => {
        let currentIndex = this.wheels[index].getSelectedIndex();
        if (this.selectedIndex[i] !== currentIndex) {
          this.selectedIndex[i] = currentIndex;
          this.trigger('picker.change', index, currentIndex);
        }
      });
    })(i);
    return this.wheels[i];
  }

  show(next) {
    if (!this.wheels) {
      this.wheels = [];
      for (let i = 0; i < this.data.length; i++) {
        this._createWheel(this.wheelEl, i);
      }
    } else {
      for (let i = 0; i < this.data.length; i++) {
        this.wheels[i].enable();
        this.wheels[i].wheelTo(this.selectedIndex[i]);
      }
    }
    next && next();
  }

  refresh(datas, selectedIndex) {
    this.wheelEl = this.pickerEl.getElementsByClassName('wheel-hook');
    this.data = datas;
    this.selectedIndex = selectedIndex;
    this.selectedVal.length = 0;
    this.wheels = null;
    this.wheels = [];
    for (let i = 0; i < this.data.length; i++) {
      this._createWheel(this.wheelEl, i);
    }
    this.refill(datas);
  }

  hide(next) {
    next && next();
    window.setTimeout(() => {
      for (let i = 0; i < this.data.length; i++) {
        this.wheels[i].disable();
      }
    }, 500);
  }

  confirm() {
    let changed = false;
    for (let i = 0; i < this.data.length; i++) {
      let index = this.wheels[i].getSelectedIndex();
      this.selectedIndex[i] = index;

      let value = null;
      if (this.data[i].length) {
        value = this.data[i][index];
      }
      if (this.selectedVal[i] !== value) {
        changed = true;
      }
      this.selectedVal[i] = value;
    }

    this.trigger('picker.select', this.selectedVal, this.selectedIndex);

    if (changed) {
      this.trigger('picker.valuechange', this.selectedVal, this.selectedIndex);
    }
  }

  // This is for Province, City and District
  refillColumn(index, data) {
    let scrollEl = this.scrollEl[index];
    let wheel = this.wheels[index];
    if (scrollEl && wheel) {
      let oldData = this.data[index];
      this.data[index] = data;

      let selectedIndex = wheel.getSelectedIndex();
      let dist = 0;
      if (oldData.length) {
        let oldValue = oldData[selectedIndex];
        for (let i = 0; i < data.length; i++) {
          if (data[i] === oldValue) {
            dist = i;
            break;
          }
        }
      }
      this.selectedIndex[index] = dist;
      wheel.refresh();
      wheel.wheelTo(dist);
      return dist;
    }
  }

  refill(datas) {
    let ret = [];
    if (!datas.length) {
      return ret;
    }
    datas.forEach((data, index) => {
      ret[index] = this.refillColumn(index, data);
    });
    return ret;
  }
}