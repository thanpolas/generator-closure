package org.superstartup.javascript;

import com.google.common.collect.ImmutableSet;
import com.google.javascript.jscomp.CommandLineRunner;
import com.google.javascript.jscomp.CompilerOptions;
import java.lang.Override;


public class SSCompilerOpts extends CommandLineRunner {
    protected SSCompilerOpts(String[] args) {
        //super class parses command line
        super(args);
    }

    @Override
    protected CompilerOptions createOptions() {
        CompilerOptions options = super.createOptions();

        //strip Logger from Javascript. Be aware of b'logger', etc.
        options.stripTypePrefixes = ImmutableSet.of("goog.debug",
"goog.asserts", "window.console");
        options.stripNameSuffixes = ImmutableSet.of("logger",
"logger_", "window.console.log");
        return options;
    }

    public static void main(String[] args) {
        (new SSCompilerOpts(args)).run();
    }
}
