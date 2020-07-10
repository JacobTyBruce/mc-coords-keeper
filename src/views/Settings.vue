<template>
    <v-main>
        <v-container fluid>
            <v-row>
                <v-col cols="4">
                    <v-card>
                        <v-card-title> Worlds - {{this.$store.state.worldsList.length}} </v-card-title>
                        <v-card-subtitle> List of total saved worlds </v-card-subtitle>
                        <v-divider></v-divider>
                        <v-list>
                            <v-list-item v-for="(n, index) in this.$store.state.worldsList" :key="n + index">
                                <v-card flat fluid>
                                    <v-card-title> {{n.name}} </v-card-title>
                                    <v-card-subtitle> {{n.desc}} </v-card-subtitle>
                                </v-card>
                            </v-list-item>
                        </v-list>
                    </v-card>
                </v-col>
                <v-col cols="6">
                   <v-card>
                       <v-card-title>Theme Settings</v-card-title>
                       <v-divider></v-divider>
                       <v-switch v-model="darkMode" :label="`Dark Mode`"></v-switch>
                   </v-card>
                </v-col>
                <v-col cols="2">
                    ds
                </v-col>
            </v-row>
            <v-row></v-row>
        </v-container>
    </v-main>
</template>

<script>
export default {
    name: 'Settings',
    data: function() {
        return {
            darkMode: this.$store.state.isDark
        }
    },
    computed: {
        // setTheme() {
        //     if (this.darkMode == true) {
        //         return (this.$store.state.isDark = true);
        //     } else {
        //         return (this.$store.state.isDark = false);
        //     }
        // }
    }

}
</script>