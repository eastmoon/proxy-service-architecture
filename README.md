# 請求服務架構 ( Request Service Architecture )

請求服務架構是一套運用於用戶端 ( Client ) 的軟體架構，其架構概念的是將非同步處理機制封裝，並以 Service 與 Callback 為基礎規範處理前 ( Service )、處理後 ( Callback ) 的運算處理鏈。

此服務架構設計之初，是考量網頁對伺服器的非同步請求設計，常因為開發人員的隨興與設計規範不嚴謹，導致非同步請求程式碼出現在無法檢測的地方，例如：

+ 頁面按鈕的觸擊事件中
+ 事件流的處理程序
+ 主動循環處理程序
+ 被動偵聽訊息處理程序

即使經過彙整將非同步請求服務模組化，也不免因為開發人員資料處理程序的想法，導致回應內容的資料處理機制管理鬆散，而用戶端若採用若型態的腳本語言 ( JavaScript、Python )，更容易影響資料處理機制的維護性。

## 架構

+ 需求服務架構類別
```
reqsrv
  └ AsyncRequestService class
      - ref axios
      - ref promise
  └ Service class
      - ref AsyncRequestService
  └ Callback class
      - ref promise
```

+ 自定義服務類別
```
CustomService extends Service {
    static foo() {
        return {
            'type': 'get',
            'result': 'json',
            'url': "http://localhost/foo/" + id,
        }
    }
}
```

+ 自定義回呼類別
```
CustomCallback extends Callback {
    // Service remote success
    success($response = null) {
        // do something ...
        return $response;
    }
    // Servcie remote fail
    fail($error = null) {
        // do something ...
        throw $error;
    }
}
```

+ 需求服務與回呼處理
    - 基礎操作
    ```
    const service = new CustomService();
    CustomCallback(service.foo()).then(...).catch(...)
    ```
    - 指定服務網址
    ```
    const service = new CustomService({
        host: "http://localhost/"
    });
    CustomCallback(service.foo()).then(...).catch(...)
    ```
    - 指定處理回呼
    ```
    const service = new CustomService({
        callback: [CustomCallback]
    });
    service.foo().then(...).catch(...)
    ```

## 開發

+ 啟動伺服器 ( [Json-Server](https://github.com/typicode/json-server) )
```
srv
```
> 此伺服器是一個簡易的 JSON 服務器，用此回應定義於 JSON 檔案中的內容，並設置一個開發環境虛擬網路，以 json-server 為其 host 名稱

+ 啟動 JavaScript 開發環境
```
js dev
```
> 此開發環境會進入 JSON 伺服器所屬的開發環境網路

+ 啟動 Python 開發環境
```
py dev
```
> 此開發環境會進入 JSON 伺服器所屬的開發環境網路

## 文獻

+ [Modelling Microservice Patterns in Code](https://vanilla-java.github.io/2016/05/17/Modelling-Microservice-Patterns-in-Code.html)
+ [Callback Service (Enables inter service communication in async manner)](https://medium.com/@nitishgoyal13/callback-service-518a7b5d73c2)
+ [functional programming with collections](https://martinfowler.com/articles/collection-pipeline/#NestedOperatorExpressions)
+ [Simple Asynchronous Microservices using Lambda Architecture.](https://vanilla-java.github.io/2016/05/16/Simple-Asynchronous-Microservices-using-Lambda-Architecture.html)
    - [數據系統架構——Lambda architecture(Lambda架構)](https://www.itread01.com/articles/1475913091.html)
    - [巨量資料架構](https://learn.microsoft.com/zh-tw/azure/architecture/data-guide/big-data/)
