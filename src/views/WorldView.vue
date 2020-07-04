<template>
    <v-main>
        
        <v-btn color="success" to="/"><v-icon mr-2>mdi-arrow-left-bold-outline</v-icon>Back</v-btn>
        <v-container>
            <v-row>
                <v-col>
                    <v-avatar
                        color="white"
                        size="100"
                        tile
                    >
                        <img src="https://vignette.wikia.nocookie.net/minecraft/images/f/fe/GrassNew.png/revision/latest?cb=20190903234415" alt="alt">
                    </v-avatar>
                </v-col>
                <v-col>
                    <h1>{{innerWorldData.title}}</h1>
                    <p>{{innerWorldData.desc}}</p>
                </v-col>
            </v-row>
            <v-row>
                <v-list>
                    <v-list-item> {{this.coords[0]}} </v-list-item>
                    <v-list-item> {{this.coords[1]}} </v-list-item>
                    <v-list-item> {{this.coords[2]}} </v-list-item>
                    <v-list-item> {{this.coords[3]}} </v-list-item>
                </v-list>
            </v-row>
        </v-container>
    </v-main>
</template>

<script>
export default {
    name: 'WorldView',
    props: ['world','worldData'],
    data: function() {
        return {
            innerWorldData: this.worldData,
            coords: this.worldData.coords
        }
    }
}
</script>