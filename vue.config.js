module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  pluginOptions: {
    electronBuilder: {
      nodeIntegration: true,
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
            "from": "./src/assets/bundle-images",
            "to": "/superlongreallyclearname",
            "filter": [
              "**/*"
            ]
          }
        ]
      },
    }
  }
}