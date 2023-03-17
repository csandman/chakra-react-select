import type { CommonPropsAndClassName, GroupBase } from "react-select";
import type { Size, SizeProp } from "./types";
/**
 * Clean Common Props
 *
 * Borrowed from the original `react-select` package
 *
 * @see {@link https://github.com/JedWatson/react-select/blob/edf5265ee0158c026c9e8527a6d0490a5ac2ef23/packages/react-select/src/utils.ts#L75-L110}
 */
export declare const cleanCommonProps: <Option, IsMulti extends boolean, Group extends GroupBase<Option>, AdditionalProps>(props: Partial<CommonPropsAndClassName<Option, IsMulti, Group>> & AdditionalProps) => Omit<AdditionalProps, keyof CommonPropsAndClassName<Option, IsMulti, Group>>;
export declare const useSize: (size: SizeProp | undefined) => Size;
//# sourceMappingURL=utils.d.ts.map