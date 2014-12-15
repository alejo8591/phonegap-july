<?php
//namespace phpUnitTest;

class URL
{
  public function sluggify($string, $separator = '-', $maxLength = 96)
  {
    /* iconv — Convierte un string a la codificación de caracteres indicada */
    /* Realiza una conversión del set de caracteres en el string str desde in_charset a out_charset. */
    $title = iconv('UTF-8', 'ASCII//TRANSLIT', $string);
    /* preg_replace — Realiza una búsqueda y sustitución de una expresión regular */
    $title = preg_replace("%[^-/+|\w ]%", '', $title);
    /* strtolower — Convierte una cadena a minúsculas */
    /* trim — Elimina espacio en blanco (u otro tipo de caracteres) del inicio y el final de la cadena */
    /* substr — Devuelve parte de una cadena */
    $title = strtolower(trim(substr($title, 0, $maxLength), '-'));
    /* preg_replace — Realiza una búsqueda y sustitución de una expresión regular */
    $title = preg_replace("/[\/_|+ -]+/", $separator, $title);
    return $title;
  }
}
?>
