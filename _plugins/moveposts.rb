
module Jekyll
    class TagMoveGenerator < Generator
      def generate(site)
        site.posts.docs.each do |post|
          post.data['tags'].each do |tag|
            dest_dir = File.join(site.dest, tag)
            FileUtils.mkdir_p(dest_dir) unless File.directory?(dest_dir)
            dest_file = File.join(dest_dir, post.data['slug'] + '.html')
            FileUtils.mv(post.path, dest_file)
          end
        end
      end
    end
  end
  