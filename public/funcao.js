$(function() {
    const sheetId = $('#sheetId').val()

    $('#btn-add').on("click", function() {
        calculeHP(1, $('#hp-value').val())
    })

    $('#btn-sub').on("click", function() {
        calculeHP(1, $('#hp-value').val())
    })

    $.ajax({
        url: `/minha-ficha/${sheetId}`,
        method: 'PUT',
        data: {name: 'EDITADO'},
        dataType: 'json'
    }).done(function(result) {
        alert(result)
    })

})

function calculeHP(operation, value) {
    alert('Operation: '+ operation +'. Value: '+ value)
}




// const sequelize = rePquire('sequelize')
// const db = require('../db')
// const Sheet = require('../models/sheet')
// const Status = require('../models/status')

// async function updtHP(operation, id) {
//     const value = $("#pv-value").val()
//     // alert(`Valor: ${value}. Operação: ${operation}.`)

//     const statusData = await db.findByPK(id)

//     if ( operation == 0 ) { // subtration
//         try {
//             statusData.current_hp = statusData.current_hp - value
//             await statusData.save()
//             alert('Pontos de Vida atualizados cmo sucesso!')
//             // passar para o html
//         } catch {
//             alert('Erro ao atualizar os Pontos de Vida.')
//         }
//     } else {
//         try {
//             statusData.current_hp = statusData.current_hp + value
//             await statusData.save()
//             alert('Pontos de Vida atualizados cmo sucesso!')
//             // passar para o html
//         } catch {
//             alert('Erro ao atualizar os Pontos de Vida.')
//         }
//     }

// }

// (function ready( win, doc ) {
//     'use strict'
//     console.log('ALO')
//     let ajax = new XMLHttpRequest()
//     ajax.open('GET', 'http://localhost:4001')
//     ajax.onreadystatechange = function() {
//         console.log('ALO')
//     }
//     ajax.send()

// })(window, document)