export type SmartFieldTypeProp = 'SmartText' | "SmartTextArea"

export type SmartFieldType = {
  type: SmartFieldTypeProp
  description: string
  nativeOptions: NativeOptionsType
  smarOptions: SmartOptionsType
  icon: string
}

export type NativeOptionsType = {
  type: string,
  length?:string,
  allowNull?: boolean
  defaultValue?: string
}
export type SmartOptionsType = {
  isLocalize?:boolean
}