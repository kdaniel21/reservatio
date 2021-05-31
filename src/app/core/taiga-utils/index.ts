import { TuiDay, TuiTime } from '@taiga-ui/cdk'
import { set } from 'date-fns'

export namespace TaigaUtils {
  export const convertDateTimeToNativeDate = (taigaValues: [TuiDay, TuiTime]) =>
    set(taigaValues[0].toLocalNativeDate(), taigaValues[1])

  export const convertNativeDateToDateTime = (nativeDate: Date): [TuiDay, TuiTime] => [
    TuiDay.fromLocalNativeDate(nativeDate),
    new TuiTime(nativeDate.getHours(), nativeDate.getMinutes(), nativeDate.getSeconds()),
  ]
}
