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
                    
                </v-col>
            </v-row>
            <v-row>

            </v-row>
        </v-container>
    </v-main>
</template>

<script>
export default {
    name: 'WorldView',
    props: ['world','worldData']
}
</script>