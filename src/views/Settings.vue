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
                       <v-switch v-model="darkMode" label="Dark Mode" @change="changeDark()"></v-switch>
                       <v-card-subtitle> <b> More Coming Soon (Custom Themes!) </b> </v-card-subtitle>
                   </v-card>
                </v-col>
                <v-col cols="2">
                    <v-btn color="error" outlined href="https://github.com/JacobTyBruce/mc-coords-keeper/issues/new" target="_blank"> Report A Problem</v-btn>
                </v-col>
            </v-row>
            <v-row></v-row>
        </v-container>
    </v-main>
</template>

<script>
import { mapActions } from 'vuex'

export default {
    name: 'Settings',
    data: function() {
        return {
            darkMode: this.$store.state.isDark
        }
    },
    methods: {
        ...mapActions({
            changeDark: 'commitOppDarkMode'
        })
    }

}
</script>