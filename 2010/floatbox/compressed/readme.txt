
This compressed folder and the files in it are not required.

The only reason they exist is because earlier versions of floatbox shipped with both compressed and uncompressed files.
Some folks upgrading from earlier versions will have their include paths pointing to this folder,
and the files in this folder will keep them working without the need to modify those include paths across their pages.

If you do not have legacy include statements pointing to this compressed folder, feel free to delete it.

(Warning: Do not copy the floatbox.css file from this folder up into your main floatbox folder.  Things will break.)
