<?php

//namespace phpUnitTest\Test;

//use phpUnitTest\URL;

require_once 'URL.php';

class URLTest extends \PHPUnit_Framework_TestCase
{
  public function testSluggifyReturnsSluggifiedString()
  {
    $originalString = 'This string will be sluggified';
    $expectedResult = 'this-string-will-be-sluggified';

    $url = new URL();

    $result = $url->sluggify($originalString);

    $this->assertEquals($expectedResult, $result);
  }
}
?>
