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
                    <h1>{{this.$store.state.currentWorld.name}}</h1>
                    <p>{{this.$store.state.currentWorld.desc}}</p>
                </v-col>
            </v-row>
            <v-row>
                <v-list>
                    <v-list-item v-for="(item, index) in this.$store.state.currentWorld.coords" :key="'coord' + index">
                        {{item.name}}
                        X: <b>{{item.x}}</b>
                        Y: <b>{{item.y}}</b>
                        Z: <b>{{item.z}}</b>
                    </v-list-item>
                </v-list>
            </v-row>
        </v-container>
    </v-main>
</template>

<script>
export default {
    name: 'WorldView',
    props: ['world'],
    data: function() {
        return {
            
        }
    }
}
</script>