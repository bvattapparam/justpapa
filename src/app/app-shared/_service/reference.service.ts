import { Injectable } from '@angular/core';

@Injectable()
export class ReferenceService {
  public publicParamList: any;
  public _manipulatedReferenceList: any;
  public _referenceDataMap : any;

  constructor() { }

  setPublicParam(param: any) {
    this._manipulatedReferenceList = this.referenceDataManipulation(param.references);
    this.publicParamList = param
  }
  getPublicParam() {
    return this.publicParamList;
  }
  getManipulatedReference(){
    return this._manipulatedReferenceList;
  }


  referenceDataManipulation(paramData: any){
    let tmpRef = paramData;
    let _tmpRefvalue = {};
      Object.keys(tmpRef).forEach(key =>{
      let length = tmpRef[key].length-1;
      _tmpRefvalue[key] = {};
      for(var i = length; i >= 0; i--){
        _tmpRefvalue[key][tmpRef[key][i]["value"]] = tmpRef[key][i]["name"];
      }
      this._referenceDataMap = _tmpRefvalue;
    })
      return this._referenceDataMap;
  }

}
