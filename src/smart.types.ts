export type SmartTypeProp = "SmartText";
export type SmartOptionsType = SmartTextOptionsType;

export type NativeOptionsType = {
  isModelsOwnField:boolean,
  type: keyof SupportedNativeTypes ;
  length?: number;
  allowNull?: boolean;
  defaultValue?: string;
};

export type SmartOptionsBase = {
  nativeOptions:NativeOptionsType
}

export type SmartTextOptionsType = SmartOptionsBase & {
  smartType: "SmartText";
  isLocalize?: boolean;
  renderUi: TextInputRenderType;
};

export type TextInputRenderType = {
  component: "TextInput";
  props?: Record<string,any>;
};

export type SmartImageOptionsType = SmartOptionsBase & {
  smartType: "SmartImage",
  availableExtensions?: string[],
  sizeLimitByKB?: number,
  allowMultiple?:boolean,
  variantsToCreate?:Array<`${string}x${string}`>
  renderUi : ImageUploadRenderType
}
export type ImageUploadRenderType = {
  component: "ImageUpload";
  props?: Record<string,any>;
};

export type SupportedNativeTypes<T=any> = {
  STRING: T,
  TEXT: T,
  INTEGER: T,
  INTEGER_UNSIGNED: T,
  INTEGER_ZEROFILL: T,
  INTEGER_UNSIGNED_ZEROFILL: T,
  BOOLEAN: T,
}