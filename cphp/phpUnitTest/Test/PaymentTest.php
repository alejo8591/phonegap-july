<?php

require_once "Payment.php";

class PaymentTest extends \PHPUnit_Framework_TestCase
{
  public function testProcessPaymentReturnsTrueOnSuccessfulPayment()
  {
    $paymentDetails = array( 'amount' => 123.99, 'card_num' => '4111-1111-1111-1111', 'exp_date' => '03/2013', );
    $payment = new Payment();

    $response = new \stdClass();
    $response->approved = true;
    $response->transaction_id = 123;

    $authorizeNet = $this->getMockBuilder('\AuthorizeNetAIM')
                         ->setConstructorArgs(array($payment::API_ID, $payment::TRANS_KEY))
                         ->getMock();

    $authorizeNet->expects($this->once())
                ->method('authorizeAndCapture')
                ->will($this->returnValue($response));

    $result = $payment->processPayment($authorizeNet, $paymentDetails);

    //$result = $payment->processPayment($paymentDetails);
    $this->assertTrue($result);
  }
}
