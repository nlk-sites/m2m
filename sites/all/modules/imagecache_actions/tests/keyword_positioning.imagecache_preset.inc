<?php
// $ID:  $
/**
 * @file
 *   Test imagecache preset.
 * 
 * Created on Dec 29, 2009
 *
 * @author 'dman' Dan Morrison http://coders.co.nz/
 */

$presets['keyword_positioning'] = array (
  'presetname' => 'keyword_positioning',
  '#weight' => 4.2,
  'actions' => array (
    array (
      'weight' => '-1',
      'module' => 'imagecache_canvasactions',
      'action' => 'canvasactions_file2canvas',
      'data' =>  array (
        'xpos' => 'right',
        'ypos' => 'top',
        'alpha' => '100',
        'path' => "$filepath/grid-240x160.png",
      ),
    ),

    array (
      'weight' => '0',
      'module' => 'imagecache_canvasactions',
      'action' => 'canvasactions_file2canvas',
      'data' => array (
        'xpos' => '25%',
        'ypos' => 'bottom-10%',
        'path' => 'misc/druplicon.png',
      ),
    ),

    array (
      'weight' => '0',
      'module' => 'imagecache_canvasactions',
      'action' => 'canvasactions_file2canvas',
      'data' => array (
        'xpos' => '0%',
        'ypos' => 'top+10%',
        'path' => 'misc/druplicon.png',
      ),
    ),

    array (
      'weight' => '0',
      'module' => 'imagecache_canvasactions',
      'action' => 'canvasactions_file2canvas',
      'data' => array (
        'xpos' => 'right+50',
        'ypos' => '50%',
        'path' => 'misc/druplicon.png',
      ),
    ),

  ),
);