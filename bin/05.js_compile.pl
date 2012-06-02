#!/usr/bin/perl
use POSIX qw(strftime);
use Time::Local;

$DEBUG = 0;
if ("--debug" eq $ARGV[0]) {
  $DEBUG = 1;
}

######################### CONFIG ###############################

$java = "/usr/bin/java";


### Project Root
$projectRoot = "..";

## The main file to include ($jsroot will be prepended)
$mainFile = "/init.js";

### Rest subfolders
$jsroot = $projectRoot . "/html/js";
$binPath = $projectRoot . "/bin";
$closurelib = $jsroot . "/closure-library";
$googPath = $jsroot . "/closure-library/closure/goog";
$externsPath = $binPath . "/externs";
#3rd party apps...
$asyncPath = $jsroot . "/closure-library/third_party/closure/goog";
$calcdeps = $jsroot . "/closure-library/closure/bin/calcdeps.py";
$closurebuilder = $jsroot . "/closure-library/closure/bin/build/closurebuilder.py";

$closurecompiler = $projectRoot . "/bin/Third-Party/closure_compiler/compiler.jar";
#$closurecompiler = $projectRoot . "/bin/superstartup-compiler/build/sscompiler.jar";
######################### CONFIG END ###########################

$cmdBuild = "$closurebuilder ";
$cmdBuild .= "-i $jsroot" . $mainFile;
$cmdBuild .= " --root $jsroot";
$cmdBuild .= " -o compiled --output_file=$projectRoot" . "/html/jsc/compiled.js";
$cmdBuild .= " --compiler_jar=\"" . $closurecompiler . "\"";

$cmdCompile = "  --compiler_flags=\"--compilation_level=ADVANCED_OPTIMIZATIONS\"";

# Define all extern files here
$cmdCompile .= "  --compiler_flags=\"--externs=$externsPath/jquery-1.7.js\"";
$cmdCompile .= "  --compiler_flags=\"--externs=$externsPath/json.js\"";
$cmdCompile .= "  --compiler_flags=\"--externs=$externsPath/customExterns.js\"";

$cmdCompile .= "  --compiler_flags=\"--define='goog.DEBUG=false'\"";
$cmdCompile .= " --compiler_flags=\"--warning_level=verbose\"";
$cmdCompile .= " --compiler_flags=\"--jscomp_off=fileoverviewTags\"";
$cmdCompile .= " --compiler_flags=\"--summary_detail_level=3\"";
$cmdCompile .= " --compiler_flags=\"--jscomp_off=checkTypes\"";

$cmdCompile .- " --compiler_flags=\"--manage_closure_dependencies\"";
if ($DEBUG) {
  $cmdCompile .= " --compiler_flags=\"--source_map_format=V3\"";
  $cmdCompile .= " --compiler_flags=\"--create_source_map=$projectRoot/html/compiled.js.map\"";
  $cmdCompile .= " --compiler_flags=\"--debug\"";
  $cmdCompile .= " --compiler_flags=\"--output_wrapper='(function(){%output%}).call(this); \\\n//@ sourceMappingURL=/compiled.js.map'\"";
} else {
  $cmdCompile .= " --compiler_flags=\"--output_wrapper='(function(){%output%}).call(this);'\"";
}

$cmdBuild .= $cmdCompile;

$cmdBuild .= " > compiler.out";

system $cmdBuild;

print "JS Compiled. See output in engine/bin/compiler.out\n";

