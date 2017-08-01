import {bindable, inject} from 'aurelia-framework';
import moment from 'moment';
//import {AureliaBootstrapTypeahead} from 'aurelia-bootstrap-typeahead';
import * as nprogress from 'nprogress';
import * as typeaheadTemplate from './templates/typeahead-symbol-template.html';

@inject()
export class BootstrapPlugin {
  @bindable picker;
  @bindable selectCamping;
  @bindable selectCondiment;
  @bindable selectStyledCondiment;
  @bindable selectPicnic;
  @bindable tag;

  activeDate = null;
  dueDate = null;
  post = {};
  picker;
  tag;
  isEditing = false;
  isOptgroupBreadDisabled = false;
  selectMappingStructure = {
    subtext: 'company'
  };
  allCampingStuff = ['Tent', 'Flashlight', 'Sleeping Bag'];
  allSelectionWithGroups = [
    { id: 1, option: 'Relish', company: 'Sweet', group: 'Condiments' },
    { id: 12, option: 'Steam', group: 'Breads' },
    { id: 11, option: 'Plain', disabled: false, group: 'Breads' },
    { id: 4, option: 'Mayonnaise', company: 'Miracle Whip', group: 'Condiments' },
    { id: 3, option: 'Ketchup',  company: 'Heinz', group: 'Condiments' },
    { id: 2, option: 'Mustard',  company: 'French\'s', group: 'Condiments' },
    { id: 13, option: 'Toasted', group: 'Breads', disabled: true }
  ];
  allCondiments = [
    { id: 1, option: 'Ketchup', company: 'Heinz' },
    { id: 2, option: 'Mustard', company: 'French\'s', divider: true },
    { id: 3, option: 'Relish', company: 'Sweet', style: 'background: #5cb85c; color: #fff;', title: 'Alternate Title' },
    { id: 4, option: 'Mayonnaise', company: 'Miracle Whip', icon: 'glyphicon-heart' }
  ];
  allStyledCondiments = [
    { id: 1, option: 'Mustard', company: 'French\'s', content: '<span class="label label-warning">Mustard</span>' },
    { id: 2, option: 'Ketchup', company: 'Heinz', content: '<span class="label label-danger">Ketchup</span>' },
    { id: 3, option: 'Relish', company: 'Sweet', content: '<span class="label label-success">Relish</span>' },
    { id: 4, option: 'Mayonnaise', company: 'Miracle Whip', disabled: true, content: '<span class="label label-info">Mayonnaise</span>' }
  ];
  selectOptions = {
    liveSearch: true,
    showSubtext: true,
    showTick: true,
    selectedTextFormat: 'count > 3'
  };
  typeaheadEmptyTemplate = `<div class="empty-message">No matches from Controller.</div>`;
  //typeaheadEmptyTemplateUrl = "src/templates/typeahead-empty-template.html";
  typeaheadRemoteUrl = './api/yahoo/quote/%QUERY';
  typeaheadTemplateUrl = 'src/templates/typeahead-symbol-template.html';
  typeaheadTemplate = typeaheadTemplate;

  constructor() {
    this.post = {
      categories: ['Javascript','C#']
    };
    this.myDateObject = new Date(2017, 1, 1, 14, 28);
    this.myDateObject2 = moment();
    this.camping = 'Flashlight';
    // this.picnic = [{ id: 2}, {id: 4 }];
    // this.condiment = { id: 4 };
    // this.campingValue = 'Sleeping Bag';
    this.picnicValue = [1, 2];
    // this.condimentValue = 3;
  }

  pickerChanged() {
    this.picker.events.onChange = (e) => console.log('onChange');
    this.picker.events.onUpdate = (e) => console.log('onUpdate');
    this.picker.methods.daysOfWeekDisabled([0, 6]); // disable Sunday & Saturday
  }

  selectPicnicChanged() {
    this.selectPicnic.events.onChanged = (e) => console.log('onChanged');
  }

  tagChanged() {
    this.tag.events.onBeforeItemAdd = (e) => console.log('onBeforeItemAdd');
    this.tag.events.onBeforeItemRemove = (e) => console.log('onBeforeItemRemove');
    this.tag.events.onItemAdded = (e) => console.log('onItemAdded');
    this.tag.events.onItemAddedOnInit = (e) => console.log('onItemAddedOnInit');
    this.tag.events.onItemRemoved = (e) => console.log('onItemRemoved');
  }

  addTag() {
    this.tag.methods.add('Tag1');
  }

  afterCallback() {
    nprogress.done();
  }

  beforeCallback() {
    nprogress.start();
  }

  changePostDateValue(dateStr) {
    this.post.dateEntered = dateStr;
  }

  changePostDateObject(dateStr) {
    this.myDateObject = new Date(dateStr);
  }

  toggleOptgroupBreads() {
    this.isOptgroupBreadDisabled = !this.isOptgroupBreadDisabled;
    this.selectPicnic.methods.disableOptgroupByLabel('Breads', this.isOptgroupBreadDisabled);
  }

  removeAllTag() {
    setTimeout(() => this.tag.methods.removeAll(), 1000);
  }

  removeTag(tagName) {
    this.tag.methods.remove(tagName);
  }

  replaceAllTags() {
    this.post.categories = ['Erlang', 'Python'];
  }

  preSelectFirstOptions() {
    // Change selection by item (object/string)
    this.camping = 'Tent';
    this.picnic = [ { 'id': 2, 'option': 'Mustard', 'company': 'French\'s' } ];
    this.condiment = { id: 4, option: 'Mayonnaise', company: 'Miracle Whip', icon: 'glyphicon-heart' };
    this.condimentStyled = { id: 4, option: 'Mayonnaise', company: 'Miracle Whip', disabled: true, content: '<span class="label label-info">Mayonnaise</span>' };
  }
  preSelectSecondOptions() {
    // Change selection by value (id)
    this.campingValue = 'Sleeping Bag';
    this.picnicValue = [1, 3, 4, 12];
    this.condimentValue = 3;
    this.condimentStyledValue = 3;
  }
}
