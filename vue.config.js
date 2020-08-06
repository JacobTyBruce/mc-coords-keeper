module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        "productName": 'Minecraft Coordinate Keeper',
        "appId": "com.jacobtbruce.mcc",
        "publish": ['github'],
        "extraResources": [
          {
            "from": "./extraResources/",
            "to": "extraResources",
            "filter": [
              "**/*"
            ]
          }
        ]
      },
    }
  }
}