#!/usr/bin/perl

use strict;
use warnings;
use v5.10;

# quit unless there is the correct number of command-line args
my $num_args = $#ARGV + 1;
if ($num_args != 3) {
    print "\nUsage: generator.pl input_file output_file component_name\n";
    exit;
}

my $input_file=$ARGV[0];
my $output_file=$ARGV[1];
my $component_name=$ARGV[2];

open(my $ifh, '<', $input_file) or die "Could not open file '$input_file' $!";
open(my $ofh, '>', $output_file) or die "Could not open file '$output_file' $!";

while(my $line = <$ifh> ) {
    print $line;
    if ($line =~ s/\@component/$component_name/g) {
        print "pattern found and replaced\n ";
    }
    else {
        print "pattern not found \n ";
    }
    print $ofh $line ;
}

close $ifh;
close $ofh;
