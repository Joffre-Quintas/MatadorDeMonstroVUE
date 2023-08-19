new Vue({
    el: "#app",
    data: {
        player1: {
            nome: "Player 1",
            vidaTotal: 100,
            vidaRestante: 100,
            ataque: 9,
            ataqueEspecial: 15,
            cura: 11
        },
        monstro: {
            nome: "Monstro",
            vidaTotal: 100,
            vidaRestante: 100,
            ataque: 10,
            ataqueEspecial: 14,
        },
        gameOn: false,
        botoesAcao: [],
        logs: [],
        vencedor:''
    },
    methods: {
        iniciarGame() {
            this.player1.vidaRestante = this.player1.vidaTotal
            this.monstro.vidaRestante = this.monstro.vidaTotal
            this.gameOn = !this.gameOn
        }  ,
        ataque() {
            const danoMonstro = Math.floor(Math.random()*4) + this.monstro.ataque
            const danoPlayer = Math.floor(Math.random()*4) + this.player1.ataque
            this.player1.vidaRestante -= danoMonstro
            this.monstro.vidaRestante -= danoPlayer
            this.logs.push(this.mensagemLog(this.monstro.nome, 'causou dano', danoMonstro))
            this.logs.push(this.mensagemLog(this.player1.nome, 'causou dano', danoPlayer))
            this.verificaVencedor()
        },
        ataqueEspecial() {
            const danoMonstro = Math.floor(Math.random()*6) + this.monstro.ataqueEspecial
            const danoPlayer = Math.floor(Math.random()*6) + this.player1.ataqueEspecial
            this.player1.vidaRestante -= danoMonstro
            this.monstro.vidaRestante -= danoPlayer
            this.logs.push(this.mensagemLog(this.monstro.nome, 'causou dano especial', danoMonstro))
            this.logs.push(this.mensagemLog(this.player1.nome, 'causou dano especial', danoPlayer))
            this.verificaVencedor()  
        },
        curar() {
            const danoMonstro = Math.floor(Math.random()*4) + this.monstro.ataque
            const curaPlayer = Math.floor(Math.random()*4) + this.player1.cura
            this.player1.vidaRestante += curaPlayer
            this.player1.vidaRestante -= danoMonstro
            this.logs.push(this.mensagemLog(this.monstro.nome, 'causou dano', danoMonstro))
            this.logs.push(this.mensagemLog(this.player1.nome, 'curou', curaPlayer))
            this.verificaVencedor()
        },
        desistir() {
            this.player1.vidaRestante = 0
            this.vencedor = this.monstro.nome
            this.gameOn = true
        },
        mensagemLog(player, acao, valor) {
            return (`${player} ${acao} DE ${valor}`).toUpperCase()
        },
        verificaVencedor() {
            if(this.player1.vidaRestante <= 0 && this.monstro.vidaRestante <= 0){
                this.vencedor = "Empate!" 
                this.player1.vidaRestante = 0              
                this.monstro.vidaRestante = 0              
            } else if (this.player1.vidaRestante <= 0) {
                this.vencedor = this.monstro.nome
                this.player1.vidaRestante = 0  
            } else if(this.monstro.vidaRestante <= 0) {
                this.vencedor = this.player1.nome
                this.monstro.vidaRestante = 0  
            }
        },
        restart() {
            this.vencedor = ''
            gameOn = false
            this.player1.vidaRestante = this.player1.vidaTotal
            this.monstro.vidaRestante = this.monstro.vidaTotal
            this.logs = []
        }
    },
    created() {
        this.botoesAcao = [
            {
                nome:"Ataque",
                cor: "red",
                acao: this.ataque,                
            },
            {
                nome:"Ataque Especial",
                cor: "orange",
                acao:this.ataqueEspecial,
            },
            {
                nome:"Curar",
                cor: "green",
                acao:this.curar,
            },
            {
                nome:"Desistir",
                cor: "gray",
                acao: this.desistir,
            }
        ]
    }
})