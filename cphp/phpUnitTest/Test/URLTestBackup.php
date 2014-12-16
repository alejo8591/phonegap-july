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

  public function testSluggifyReturnsExpectedForStringsContainingNumbers()
  {
    $originalString = 'This1 string2 will3 be 44 sluggified10';
    $expectedResult = 'this1-string2-will3-be-44-sluggified10';
    $url = new URL();
    $result = $url->sluggify($originalString);
    $this->assertEquals($expectedResult, $result);
  }

  public function testSluggifyReturnsExpectedForStringsContainingSpecialCharacters()
  {
    $originalString = 'This! @string#$ %$will ()be "sluggified';
    $expectedResult = 'this-string-will-be-sluggified';
    $url = new URL();
    $result = $url->sluggify($originalString);
    $this->assertEquals($expectedResult, $result);
  }

  public function testSluggifyReturnsExpectedForStringsContainingNonEnglishCharacters()
  {
    $originalString = "Tänk efter nu – förr'n vi föser dig bort ñ";
    $expectedResult = 'tank-efter-nu-forrn-vi-foser-dig-bort-n';
    $url = new URL();
    $result = $url->sluggify($originalString);
    $this->assertEquals($expectedResult, $result);
  }

  public function testSluggifyReturnsExpectedForEmptyStrings()
  {
    $originalString = '';
    $expectedResult = '';
    $url = new URL();
    $result = $url->sluggify($originalString);
    $this->assertEquals($expectedResult, $result);
  }
}
?>
