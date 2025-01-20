import { BaseModelResponse } from '@/models/services/responses/BaseModelResponse'
import { WelfareSelectDataModel } from '@/models/uikits/WelfareSelectTypes'
import { DeliveryAddressModel } from '@/models/views/common/DeliveryAddressModel'

export interface OrderDeliveryAddressModelResponse extends BaseModelResponse<DeliveryAddressModel[]> {}

export interface OptionCodeTelListsResponse extends BaseModelResponse<WelfareSelectDataModel[]> {}
export interface OptionCodeContactListsResponse extends BaseModelResponse<WelfareSelectDataModel[]> {}
