ActiveAdmin.register_page "Dashboard" do

  menu priority: 1, label: proc{ I18n.t("active_admin.dashboard") }

  content title: proc{ I18n.t("active_admin.dashboard") } do
    columns do
      column do
        panel "Статистика" do
          yandex_link = <<-LINK
            <!-- Yandex.Metrika informer -->
              <a href="https://metrika.yandex.ru/stat/?id=36872150&amp;from=informer"
target="_blank" rel="nofollow"><img src="https://informer.yandex.ru/informer/36872150/3_1_FFFFFFFF_EFEFEFFF_0_pageviews"
style="width:88px; height:31px; border:0;" alt="Яндекс.Метрика" title="Яндекс.Метрика: данные за сегодня (просмотры, визиты и уникальные посетители)" onclick="try{Ya.Metrika.informer({i:this,id:36872150,lang:'ru'});return false}catch(e){}" /></a>
            <!-- /Yandex.Metrika informer -->
          LINK
          yandex_link.html_safe
        end
      end

      column do
        panel "Пользователи" do
          h4 "Активные #{User.count}"
          h4 "Удаленые #{User.unscoped.where.not(destroyed_at: nil).count}"
          h4 "Публиковали #{User.having_posts.count}"
          h4 "Не Публиковали #{User.count - User.having_posts.count}"
        end
      end

      column do
        panel "Посты" do
          h1 Post.count
        end
      end

      column do
        panel "Attachments" do
          h1 Attachment.count
          a 'Очистить', href: clean_attachments_path
        end
      end
    end

  end # content

end
