import React, { Component } from 'react'
import ChatBot from 'react-simple-chatbot'
import { ThemeProvider } from 'styled-components'
import botAvatar from "../static/shoes.png";

const theme = {
    background: '#f5f8fb',
    headerBgColor: 'yellow',
    headerFontColor: 'black',
    headerFontSize: '25px',
    botBubbleColor: 'yellow',
    botFontColor: 'black',
    userBubbleColor: '#0cb3c9',
    userFontColor: '#fff',
}

export default class Contenido extends Component {
    render() {
        return (
            <ThemeProvider theme={theme}>
                <ChatBot
                width="350px"
                botAvatar={botAvatar}
                botDelay={300}
                userDelay={10}
                headerTitle="HenryShoes - Assistant"
                    steps={[
                        {
                            id: "1",
                            message: "hi I'm your assistant, Do you need anything from me?",
                            trigger: "2"
                        },                        
                        {
                            id: "2",
                            options: [
                                {value: "y", label: "Yes", trigger: "3A"},
                                {value: "n", label: "No", trigger: "3B"},
                            ]
                        },
                        {
                            id: "3A",
                            message: "Tell me what are you looking for...",
                            trigger: "seleccion"
                        },
                        {
                            id: "3B",
                            message: "Im sorry if I cannot be of help to you. See you later",
                            end: true
                        },
                        {
                            id: "seleccion",
                            options: [
                                {value: "s", label: "purchasing process", trigger: "7A"},
                                {value: "p", label: "Payments", trigger: "7B"},
                                {value: "e", label: "Shipments ", trigger: "7C"},
                                {value: "c", label: "Returns & Replacements", trigger: "7D"},
                            ]
                        },
                        {
                            id: "7A",
                            message: "choose the option what you need to know?",
                            trigger: "BuyProccess",
                        },
                        {
                            id: "7B",
                            message: "choose the option please?",
                            trigger: "Payment",
                        },
                        {
                            id: "7C",
                            message: "just by FEDEX",
                            trigger: "preguntaVuelta",
                        },
                        {
                            id: "7D",
                            message: "I hope some day we implement that option",
                            trigger: "preguntaVuelta",
                        },
                        {
                            id: "BuyProccess",
                            options: [
                                {value: "a", label: "how do i buy in HenryShoes", trigger: "9A"},
                                {value: "z", label: "How do I check my order cart?", trigger: "9B"},
                                {value: "s", label: "Can I cancel my order?", trigger: "9C"},
                            ]
                        },
                        {
                            id: "Payment",
                            options: [
                                {value: "p", label: "how can I pay?", trigger: "10A"},
                                {value: "m", label: "payment methods", trigger: "10B"},
                                {value: "d", label: "How do I know that the payment was made?", trigger: "10C"},
                            ]
                        },
                        {
                            id: "9A",
                            message: "enter your user, choose the product and pay, it's that simple...",
                            trigger: "preguntaVuelta",
                        },
                        {
                            id: "9B",
                            message: "In the upper right corner there is a cart button, click there",
                            trigger: "preguntaVuelta",
                        },
                        {
                            id: "9C",
                            message: "you have to call 0800-changes with the purchase number",
                            trigger: "preguntaVuelta",
                        },
                        {
                            id: "10A",
                            message: "you log in, confirm your order, complete the remaining data and we will send you to the payment gateway",
                            trigger: "preguntaVuelta"
                        },
                        {
                            id: "10B",
                            message: "For now we only have Paypal for payments",
                            trigger: "preguntaVuelta"
                        },
                        {
                            id: "10C",
                            message: "you can see the order in your profile, by clicking on your user button and choose the option 'my orders' in your profile",
                            trigger: "preguntaVuelta"
                        },
                        {
                            id: "preguntaVuelta",
                            message: "Do you need to know anything else?",
                            trigger: "respuestaVuelta",
                        }, 
                        {
                            id: "respuestaVuelta",
                            options: [
                                {value: "y", label: "Yes", trigger: "3A"},
                                {value: "n", label: "No", trigger: "3B"},
                            ],
                        }
                    ]}
                />
            </ThemeProvider>
        )
    }
}