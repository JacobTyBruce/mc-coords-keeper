module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        "productName": 'Minecraft Coordinate Keeper',
        "appId": "com.jacobtbruce.mcc",
        "publish": [
          {
            "provider": "github",
            "owner": "JacobTyBruce",
            "repo": "mc-coords-keeper",
            "releaseType": "draft"
          }
      ],
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