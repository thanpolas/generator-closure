#!/usr/bin/perl
use POSIX qw(strftime);
use Time::Local;



######################### CONFIG ###############################
### date stamp
$dateStamp = strftime("%d-%m-%Y", localtime);
### Project Root
$projectRoot = "..";
$jsroot = $projectRoot . "/html/js";
$closurelib = $jsroot . "/closure-library";
$googPath = $jsroot . "/closure-library/closure/goog";
$asyncPath = $jsroot . "/closure-library/third_party/closure/goog";
$ourPath = $jsroot . "/";

$calcdeps = $closurelib . "/closure/bin/calcdeps.py";

$java = "/usr/bin/java";

$cmdrun = "$calcdeps -d $jsroot" . "/closure-library -p $ourPath -o deps --output_file=$jsroot" . "/deps.js";

print "Will execute: " . $cmdrun . "\n";

system ($cmdrun);
