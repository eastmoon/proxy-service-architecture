// Library
import test from "./mocha/test.conf";

// 依輸入參數決定測試項目類型是否為開發模式
const INFO = {
    // 測試檔案根目錄
    ROOT: `test`,
    // 報表輸出目錄
    REPORT: `report/`
};
test(INFO, "");
