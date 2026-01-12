<?php

// echo "Hello from PHP!";

$data = json_decode(file_get_contents("php://input"), true);
// echo "\n\nJSON array from POST: \n";
// print_r($data);
// die();

// Forming the text of the letter
$message = "<h2>Данные клиента</h2>";
$message .= "Сообщение от: {$data['form']['name']} <br>";
$message .= "Email:  {$data['form']['email']}<br>";
$message .= "Телефон:  {$data['form']['phone']}";
$message .= "<hr>";

// The text of the letter, application details
$message .= "<h2>Данные по заявке</h2>";
$message .= "Стоимость недвижимости: {$data['data']['cost']} <br>";
$message .= "Первоначальный платеж: {$data['data']['payment']} <br>";
$message .= "Срок в годах: {$data['data']['term']} <br>";
$message .= "<hr>";

// Calculation results
$message .= "<h2>Результаты расчета</h2>";
$message .= "Процентная ставка: {$data['results']['rate']} <br>";
$message .= "Сумма кредита: {$data['results']['totalAmount']} <br>";
$message .= "Ежемесячный платеж: {$data['results']['monthPayment']} <br>";
$message .= "Переплата: {$data['results']['overPayment']} <br>";

// Sending the letter
$result = mail('info@mail.com', 'Заявка на ипотеку', $message);

if ($result) {
    echo "SUCCESS";
} else {
    echo "FAILED";
}