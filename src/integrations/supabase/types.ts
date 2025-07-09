export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      affiliate_analytics: {
        Row: {
          conversion_rate: number | null
          current_balance: number | null
          id: string
          this_month_earnings: number | null
          top_performing_link_id: string | null
          total_earnings: number | null
          total_referrals: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          conversion_rate?: number | null
          current_balance?: number | null
          id?: string
          this_month_earnings?: number | null
          top_performing_link_id?: string | null
          total_earnings?: number | null
          total_referrals?: number | null
          updated_at?: string
          user_id: string
        }
        Update: {
          conversion_rate?: number | null
          current_balance?: number | null
          id?: string
          this_month_earnings?: number | null
          top_performing_link_id?: string | null
          total_earnings?: number | null
          total_referrals?: number | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "affiliate_analytics_top_performing_link_id_fkey"
            columns: ["top_performing_link_id"]
            isOneToOne: false
            referencedRelation: "affiliate_links"
            referencedColumns: ["id"]
          },
        ]
      }
      affiliate_links: {
        Row: {
          campaign_name: string | null
          clicks_count: number | null
          conversions_count: number | null
          created_at: string
          id: string
          is_active: boolean | null
          link_code: string
          user_id: string
        }
        Insert: {
          campaign_name?: string | null
          clicks_count?: number | null
          conversions_count?: number | null
          created_at?: string
          id?: string
          is_active?: boolean | null
          link_code: string
          user_id: string
        }
        Update: {
          campaign_name?: string | null
          clicks_count?: number | null
          conversions_count?: number | null
          created_at?: string
          id?: string
          is_active?: boolean | null
          link_code?: string
          user_id?: string
        }
        Relationships: []
      }
      affiliate_payouts: {
        Row: {
          amount: number
          created_at: string
          id: string
          payout_details: Json | null
          payout_method: string
          processed_at: string | null
          status: string | null
          transaction_id: string | null
          user_id: string
        }
        Insert: {
          amount: number
          created_at?: string
          id?: string
          payout_details?: Json | null
          payout_method: string
          processed_at?: string | null
          status?: string | null
          transaction_id?: string | null
          user_id: string
        }
        Update: {
          amount?: number
          created_at?: string
          id?: string
          payout_details?: Json | null
          payout_method?: string
          processed_at?: string | null
          status?: string | null
          transaction_id?: string | null
          user_id?: string
        }
        Relationships: []
      }
      affiliate_referrals: {
        Row: {
          affiliate_link_id: string | null
          affiliate_user_id: string
          commission_amount: number | null
          commission_rate: number
          commission_type: string
          confirmed_at: string | null
          created_at: string
          id: string
          paid_at: string | null
          referral_source: string | null
          referred_user_id: string | null
          status: string | null
        }
        Insert: {
          affiliate_link_id?: string | null
          affiliate_user_id: string
          commission_amount?: number | null
          commission_rate: number
          commission_type: string
          confirmed_at?: string | null
          created_at?: string
          id?: string
          paid_at?: string | null
          referral_source?: string | null
          referred_user_id?: string | null
          status?: string | null
        }
        Update: {
          affiliate_link_id?: string | null
          affiliate_user_id?: string
          commission_amount?: number | null
          commission_rate?: number
          commission_type?: string
          confirmed_at?: string | null
          created_at?: string
          id?: string
          paid_at?: string | null
          referral_source?: string | null
          referred_user_id?: string | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "affiliate_referrals_affiliate_link_id_fkey"
            columns: ["affiliate_link_id"]
            isOneToOne: false
            referencedRelation: "affiliate_links"
            referencedColumns: ["id"]
          },
        ]
      }
      business_listings: {
        Row: {
          count: number | null
          created_at: string | null
          id: number
          target: number | null
          updated_at: string | null
        }
        Insert: {
          count?: number | null
          created_at?: string | null
          id?: number
          target?: number | null
          updated_at?: string | null
        }
        Update: {
          count?: number | null
          created_at?: string | null
          id?: number
          target?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      communications: {
        Row: {
          campaign_name: string | null
          clicked_at: string | null
          communication_type: string | null
          content: string | null
          created_at: string | null
          id: string
          opened_at: string | null
          sent_at: string | null
          status: string | null
          subject: string | null
          user_id: string | null
        }
        Insert: {
          campaign_name?: string | null
          clicked_at?: string | null
          communication_type?: string | null
          content?: string | null
          created_at?: string | null
          id?: string
          opened_at?: string | null
          sent_at?: string | null
          status?: string | null
          subject?: string | null
          user_id?: string | null
        }
        Update: {
          campaign_name?: string | null
          clicked_at?: string | null
          communication_type?: string | null
          content?: string | null
          created_at?: string | null
          id?: string
          opened_at?: string | null
          sent_at?: string | null
          status?: string | null
          subject?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      communities: {
        Row: {
          community_type: string | null
          created_at: string | null
          created_by: string | null
          description: string | null
          id: string
          is_active: boolean | null
          member_count: number | null
          name: string
          privacy_settings: Json | null
          updated_at: string | null
        }
        Insert: {
          community_type?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          member_count?: number | null
          name: string
          privacy_settings?: Json | null
          updated_at?: string | null
        }
        Update: {
          community_type?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          member_count?: number | null
          name?: string
          privacy_settings?: Json | null
          updated_at?: string | null
        }
        Relationships: []
      }
      community_memberships: {
        Row: {
          community_id: string | null
          id: string
          joined_at: string | null
          role: string | null
          user_id: string | null
        }
        Insert: {
          community_id?: string | null
          id?: string
          joined_at?: string | null
          role?: string | null
          user_id?: string | null
        }
        Update: {
          community_id?: string | null
          id?: string
          joined_at?: string | null
          role?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "community_memberships_community_id_fkey"
            columns: ["community_id"]
            isOneToOne: false
            referencedRelation: "communities"
            referencedColumns: ["id"]
          },
        ]
      }
      company_pages: {
        Row: {
          benefits_data: Json | null
          company_culture: string | null
          company_description: string | null
          company_name: string
          created_at: string | null
          hr_documents: Json | null
          id: string
          internal_communications: Json | null
          is_active: boolean | null
          team_structure: Json | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          benefits_data?: Json | null
          company_culture?: string | null
          company_description?: string | null
          company_name: string
          created_at?: string | null
          hr_documents?: Json | null
          id?: string
          internal_communications?: Json | null
          is_active?: boolean | null
          team_structure?: Json | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          benefits_data?: Json | null
          company_culture?: string | null
          company_description?: string | null
          company_name?: string
          created_at?: string | null
          hr_documents?: Json | null
          id?: string
          internal_communications?: Json | null
          is_active?: boolean | null
          team_structure?: Json | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      connection_requests: {
        Row: {
          created_at: string
          id: string
          message: string | null
          recipient_id: string
          requester_id: string
          status: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          message?: string | null
          recipient_id: string
          requester_id: string
          status?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          message?: string | null
          recipient_id?: string
          requester_id?: string
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      connections: {
        Row: {
          connected_at: string
          connection_source: string | null
          id: string
          user1_id: string
          user2_id: string
        }
        Insert: {
          connected_at?: string
          connection_source?: string | null
          id?: string
          user1_id: string
          user2_id: string
        }
        Update: {
          connected_at?: string
          connection_source?: string | null
          id?: string
          user1_id?: string
          user2_id?: string
        }
        Relationships: []
      }
      directory_listings: {
        Row: {
          address: string | null
          business_name: string
          category: string | null
          city: string | null
          country: string | null
          created_at: string | null
          description: string | null
          email: string | null
          featured: boolean | null
          gallery_images: Json | null
          id: string
          is_active: boolean | null
          logo_url: string | null
          opening_hours: Json | null
          phone: string | null
          postal_code: string | null
          seo_keywords: string[] | null
          services: Json | null
          social_links: Json | null
          updated_at: string | null
          user_id: string | null
          website_url: string | null
        }
        Insert: {
          address?: string | null
          business_name: string
          category?: string | null
          city?: string | null
          country?: string | null
          created_at?: string | null
          description?: string | null
          email?: string | null
          featured?: boolean | null
          gallery_images?: Json | null
          id?: string
          is_active?: boolean | null
          logo_url?: string | null
          opening_hours?: Json | null
          phone?: string | null
          postal_code?: string | null
          seo_keywords?: string[] | null
          services?: Json | null
          social_links?: Json | null
          updated_at?: string | null
          user_id?: string | null
          website_url?: string | null
        }
        Update: {
          address?: string | null
          business_name?: string
          category?: string | null
          city?: string | null
          country?: string | null
          created_at?: string | null
          description?: string | null
          email?: string | null
          featured?: boolean | null
          gallery_images?: Json | null
          id?: string
          is_active?: boolean | null
          logo_url?: string | null
          opening_hours?: Json | null
          phone?: string | null
          postal_code?: string | null
          seo_keywords?: string[] | null
          services?: Json | null
          social_links?: Json | null
          updated_at?: string | null
          user_id?: string | null
          website_url?: string | null
        }
        Relationships: []
      }
      dynamic_plans: {
        Row: {
          base_price: number
          created_at: string
          features: Json
          id: string
          industry_focus: string
          is_active: boolean | null
          plan_name: string
          plan_type: string
          roi_projection: number
          target_business_size: string
          updated_at: string
        }
        Insert: {
          base_price: number
          created_at?: string
          features?: Json
          id?: string
          industry_focus: string
          is_active?: boolean | null
          plan_name: string
          plan_type: string
          roi_projection: number
          target_business_size: string
          updated_at?: string
        }
        Update: {
          base_price?: number
          created_at?: string
          features?: Json
          id?: string
          industry_focus?: string
          is_active?: boolean | null
          plan_name?: string
          plan_type?: string
          roi_projection?: number
          target_business_size?: string
          updated_at?: string
        }
        Relationships: []
      }
      favourites: {
        Row: {
          created_at: string
          favourited_profile_id: string
          id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          favourited_profile_id: string
          id?: string
          user_id: string
        }
        Update: {
          created_at?: string
          favourited_profile_id?: string
          id?: string
          user_id?: string
        }
        Relationships: []
      }
      form_analytics: {
        Row: {
          created_at: string
          form_id: string
          id: string
          metric_type: string
          step_number: number | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          form_id: string
          id?: string
          metric_type: string
          step_number?: number | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          form_id?: string
          id?: string
          metric_type?: string
          step_number?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "form_analytics_form_id_fkey"
            columns: ["form_id"]
            isOneToOne: false
            referencedRelation: "forms"
            referencedColumns: ["id"]
          },
        ]
      }
      form_responses: {
        Row: {
          completion_status: string
          completion_time: number | null
          created_at: string
          form_id: string
          id: string
          ip_address: unknown | null
          response_data: Json
          submitted_at: string | null
          updated_at: string
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          completion_status?: string
          completion_time?: number | null
          created_at?: string
          form_id: string
          id?: string
          ip_address?: unknown | null
          response_data?: Json
          submitted_at?: string | null
          updated_at?: string
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          completion_status?: string
          completion_time?: number | null
          created_at?: string
          form_id?: string
          id?: string
          ip_address?: unknown | null
          response_data?: Json
          submitted_at?: string | null
          updated_at?: string
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "form_responses_form_id_fkey"
            columns: ["form_id"]
            isOneToOne: false
            referencedRelation: "forms"
            referencedColumns: ["id"]
          },
        ]
      }
      forms: {
        Row: {
          created_at: string
          created_by: string | null
          description: string | null
          form_data: Json
          form_type: string
          id: string
          is_active: boolean
          settings: Json
          template_type: string | null
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          form_data?: Json
          form_type: string
          id?: string
          is_active?: boolean
          settings?: Json
          template_type?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          form_data?: Json
          form_type?: string
          id?: string
          is_active?: boolean
          settings?: Json
          template_type?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      global_settings: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          setting_key: string
          setting_value: Json
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          setting_key: string
          setting_value: Json
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          setting_key?: string
          setting_value?: Json
          updated_at?: string | null
        }
        Relationships: []
      }
      landing_pages: {
        Row: {
          analytics_data: Json | null
          created_at: string | null
          custom_domain: string | null
          id: string
          is_published: boolean | null
          page_data: Json | null
          seo_description: string | null
          seo_title: string | null
          slug: string
          template_id: string | null
          title: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          analytics_data?: Json | null
          created_at?: string | null
          custom_domain?: string | null
          id?: string
          is_published?: boolean | null
          page_data?: Json | null
          seo_description?: string | null
          seo_title?: string | null
          slug: string
          template_id?: string | null
          title: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          analytics_data?: Json | null
          created_at?: string | null
          custom_domain?: string | null
          id?: string
          is_published?: boolean | null
          page_data?: Json | null
          seo_description?: string | null
          seo_title?: string | null
          slug?: string
          template_id?: string | null
          title?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      leads: {
        Row: {
          created_at: string | null
          deal_value: number | null
          expected_close_date: string | null
          id: string
          notes: string | null
          probability: number | null
          stage: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          deal_value?: number | null
          expected_close_date?: string | null
          id?: string
          notes?: string | null
          probability?: number | null
          stage?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          deal_value?: number | null
          expected_close_date?: string | null
          id?: string
          notes?: string | null
          probability?: number | null
          stage?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      me_profile_urls: {
        Row: {
          created_at: string | null
          id: string
          is_active: boolean | null
          updated_at: string | null
          url_slug: string
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          updated_at?: string | null
          url_slug: string
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          updated_at?: string | null
          url_slug?: string
          user_id?: string | null
        }
        Relationships: []
      }
      messages: {
        Row: {
          content: string
          created_at: string
          file_attachments: Json | null
          id: string
          read_at: string | null
          recipient_id: string
          sender_id: string
          thread_id: string
        }
        Insert: {
          content: string
          created_at?: string
          file_attachments?: Json | null
          id?: string
          read_at?: string | null
          recipient_id: string
          sender_id: string
          thread_id: string
        }
        Update: {
          content?: string
          created_at?: string
          file_attachments?: Json | null
          id?: string
          read_at?: string | null
          recipient_id?: string
          sender_id?: string
          thread_id?: string
        }
        Relationships: []
      }
      networking_analytics: {
        Row: {
          connections_count: number | null
          id: string
          messages_received_count: number | null
          messages_sent_count: number | null
          profile_views_count: number | null
          referrals_count: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          connections_count?: number | null
          id?: string
          messages_received_count?: number | null
          messages_sent_count?: number | null
          profile_views_count?: number | null
          referrals_count?: number | null
          updated_at?: string
          user_id: string
        }
        Update: {
          connections_count?: number | null
          id?: string
          messages_received_count?: number | null
          messages_sent_count?: number | null
          profile_views_count?: number | null
          referrals_count?: number | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      nfc_card_orders: {
        Row: {
          card_type: string
          cost: number
          created_at: string
          delivered_at: string | null
          delivery_address: Json
          id: string
          order_status: string | null
          quantity: number
          shipped_at: string | null
          tracking_number: string | null
          user_id: string
        }
        Insert: {
          card_type: string
          cost: number
          created_at?: string
          delivered_at?: string | null
          delivery_address: Json
          id?: string
          order_status?: string | null
          quantity?: number
          shipped_at?: string | null
          tracking_number?: string | null
          user_id: string
        }
        Update: {
          card_type?: string
          cost?: number
          created_at?: string
          delivered_at?: string | null
          delivery_address?: Json
          id?: string
          order_status?: string | null
          quantity?: number
          shipped_at?: string | null
          tracking_number?: string | null
          user_id?: string
        }
        Relationships: []
      }
      package_builder_sessions: {
        Row: {
          completion_percentage: number | null
          completion_status: string | null
          conversation_data: Json
          created_at: string | null
          current_step: number | null
          generated_package: Json | null
          id: string
          pricing_data: Json | null
          session_id: string
          updated_at: string | null
          user_email: string | null
          values_modifiers: Json | null
        }
        Insert: {
          completion_percentage?: number | null
          completion_status?: string | null
          conversation_data?: Json
          created_at?: string | null
          current_step?: number | null
          generated_package?: Json | null
          id?: string
          pricing_data?: Json | null
          session_id: string
          updated_at?: string | null
          user_email?: string | null
          values_modifiers?: Json | null
        }
        Update: {
          completion_percentage?: number | null
          completion_status?: string | null
          conversation_data?: Json
          created_at?: string | null
          current_step?: number | null
          generated_package?: Json | null
          id?: string
          pricing_data?: Json | null
          session_id?: string
          updated_at?: string | null
          user_email?: string | null
          values_modifiers?: Json | null
        }
        Relationships: []
      }
      partnership_settings: {
        Row: {
          audience_package: Json
          branding_options: Json
          co_marketing_rules: Json | null
          created_at: string
          id: string
          partner_id: string | null
          revenue_sharing: Json | null
          updated_at: string
        }
        Insert: {
          audience_package: Json
          branding_options: Json
          co_marketing_rules?: Json | null
          created_at?: string
          id?: string
          partner_id?: string | null
          revenue_sharing?: Json | null
          updated_at?: string
        }
        Update: {
          audience_package?: Json
          branding_options?: Json
          co_marketing_rules?: Json | null
          created_at?: string
          id?: string
          partner_id?: string | null
          revenue_sharing?: Json | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "partnership_settings_partner_id_fkey"
            columns: ["partner_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      profile_completion_tracking: {
        Row: {
          account_created: boolean | null
          company_profile_completed: boolean | null
          company_profile_started: boolean | null
          created_at: string | null
          current_step: string | null
          id: string
          me_profile_completed: boolean | null
          me_profile_started: boolean | null
          overall_completion_percentage: number | null
          package_builder_completed: boolean | null
          payment_completed: boolean | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          account_created?: boolean | null
          company_profile_completed?: boolean | null
          company_profile_started?: boolean | null
          created_at?: string | null
          current_step?: string | null
          id?: string
          me_profile_completed?: boolean | null
          me_profile_started?: boolean | null
          overall_completion_percentage?: number | null
          package_builder_completed?: boolean | null
          payment_completed?: boolean | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          account_created?: boolean | null
          company_profile_completed?: boolean | null
          company_profile_started?: boolean | null
          created_at?: string | null
          current_step?: string | null
          id?: string
          me_profile_completed?: boolean | null
          me_profile_started?: boolean | null
          overall_completion_percentage?: number | null
          package_builder_completed?: boolean | null
          payment_completed?: boolean | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      profile_views: {
        Row: {
          converted_to_user: boolean | null
          created_at: string
          id: string
          referral_source: string | null
          viewed_profile_id: string
          viewer_email: string | null
          viewer_id: string | null
          viewer_name: string | null
        }
        Insert: {
          converted_to_user?: boolean | null
          created_at?: string
          id?: string
          referral_source?: string | null
          viewed_profile_id: string
          viewer_email?: string | null
          viewer_id?: string | null
          viewer_name?: string | null
        }
        Update: {
          converted_to_user?: boolean | null
          created_at?: string
          id?: string
          referral_source?: string | null
          viewed_profile_id?: string
          viewer_email?: string | null
          viewer_id?: string | null
          viewer_name?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          completion_rate: number | null
          created_at: string | null
          id: number
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          completion_rate?: number | null
          created_at?: string | null
          id?: number
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          completion_rate?: number | null
          created_at?: string | null
          id?: number
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      revenue: {
        Row: {
          created_at: string | null
          current_quarter: number | null
          id: number
          target_quarter: number | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          current_quarter?: number | null
          id?: number
          target_quarter?: number | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          current_quarter?: number | null
          id?: number
          target_quarter?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      revenue_records: {
        Row: {
          amount: number
          created_at: string
          id: string
          status: string
          type: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          amount: number
          created_at?: string
          id?: string
          status: string
          type: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          amount?: number
          created_at?: string
          id?: string
          status?: string
          type?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "revenue_records_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      subscriptions: {
        Row: {
          amount: number
          auto_renew: boolean | null
          created_at: string
          end_date: string
          id: string
          start_date: string
          status: string
          tier: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          amount: number
          auto_renew?: boolean | null
          created_at?: string
          end_date: string
          id?: string
          start_date: string
          status: string
          tier: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          amount?: number
          auto_renew?: boolean | null
          created_at?: string
          end_date?: string
          id?: string
          start_date?: string
          status?: string
          tier?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "subscriptions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      tier_settings: {
        Row: {
          created_at: string | null
          id: string
          setting_key: string
          setting_value: Json
          tier: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          setting_key: string
          setting_value: Json
          tier: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          setting_key?: string
          setting_value?: Json
          tier?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      user_class_settings: {
        Row: {
          created_at: string | null
          id: string
          setting_key: string
          setting_value: Json
          updated_at: string | null
          user_class: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          setting_key: string
          setting_value: Json
          updated_at?: string | null
          user_class: string
        }
        Update: {
          created_at?: string | null
          id?: string
          setting_key?: string
          setting_value?: Json
          updated_at?: string | null
          user_class?: string
        }
        Relationships: []
      }
      user_package_subscriptions: {
        Row: {
          activated_at: string | null
          billing_cycle: string | null
          created_at: string | null
          id: string
          package_builder_session_id: string | null
          package_data: Json
          pricing_data: Json
          stripe_subscription_id: string | null
          subscription_status: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          activated_at?: string | null
          billing_cycle?: string | null
          created_at?: string | null
          id?: string
          package_builder_session_id?: string | null
          package_data: Json
          pricing_data: Json
          stripe_subscription_id?: string | null
          subscription_status?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          activated_at?: string | null
          billing_cycle?: string | null
          created_at?: string | null
          id?: string
          package_builder_session_id?: string | null
          package_data?: Json
          pricing_data?: Json
          stripe_subscription_id?: string | null
          subscription_status?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_package_subscriptions_package_builder_session_id_fkey"
            columns: ["package_builder_session_id"]
            isOneToOne: false
            referencedRelation: "package_builder_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      user_packages: {
        Row: {
          created_at: string
          custom_features: Json
          id: string
          monthly_price: number
          package_conversation: Json
          plan_id: string | null
          roi_guarantee: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          custom_features?: Json
          id?: string
          monthly_price: number
          package_conversation?: Json
          plan_id?: string | null
          roi_guarantee?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          custom_features?: Json
          id?: string
          monthly_price?: number
          package_conversation?: Json
          plan_id?: string | null
          roi_guarantee?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_packages_plan_id_fkey"
            columns: ["plan_id"]
            isOneToOne: false
            referencedRelation: "dynamic_plans"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_packages_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      user_profiles: {
        Row: {
          account_tier: Database["public"]["Enums"]["account_tier"] | null
          bio: string | null
          company_name: string | null
          completion_percentage: number | null
          contact_preferences: Json | null
          created_at: string | null
          first_name: string | null
          id: string
          job_title: string | null
          last_name: string | null
          nfc_enabled: boolean | null
          phone: string | null
          profile_completion_status:
            | Database["public"]["Enums"]["profile_completion_status"]
            | null
          profile_image_url: string | null
          qr_code_url: string | null
          social_links: Json | null
          updated_at: string | null
          user_class: Database["public"]["Enums"]["user_class"] | null
          user_id: string | null
          website_url: string | null
        }
        Insert: {
          account_tier?: Database["public"]["Enums"]["account_tier"] | null
          bio?: string | null
          company_name?: string | null
          completion_percentage?: number | null
          contact_preferences?: Json | null
          created_at?: string | null
          first_name?: string | null
          id?: string
          job_title?: string | null
          last_name?: string | null
          nfc_enabled?: boolean | null
          phone?: string | null
          profile_completion_status?:
            | Database["public"]["Enums"]["profile_completion_status"]
            | null
          profile_image_url?: string | null
          qr_code_url?: string | null
          social_links?: Json | null
          updated_at?: string | null
          user_class?: Database["public"]["Enums"]["user_class"] | null
          user_id?: string | null
          website_url?: string | null
        }
        Update: {
          account_tier?: Database["public"]["Enums"]["account_tier"] | null
          bio?: string | null
          company_name?: string | null
          completion_percentage?: number | null
          contact_preferences?: Json | null
          created_at?: string | null
          first_name?: string | null
          id?: string
          job_title?: string | null
          last_name?: string | null
          nfc_enabled?: boolean | null
          phone?: string | null
          profile_completion_status?:
            | Database["public"]["Enums"]["profile_completion_status"]
            | null
          profile_image_url?: string | null
          qr_code_url?: string | null
          social_links?: Json | null
          updated_at?: string | null
          user_class?: Database["public"]["Enums"]["user_class"] | null
          user_id?: string | null
          website_url?: string | null
        }
        Relationships: []
      }
      users: {
        Row: {
          account_tier: string | null
          company_name: string | null
          created_at: string
          email: string
          first_name: string | null
          id: string
          last_name: string | null
          location: string | null
          me_profile_completed: boolean | null
          phone: string | null
          revenue_contribution: number | null
          rewards_tier: string | null
          status: string | null
          updated_at: string
          user_class: string | null
        }
        Insert: {
          account_tier?: string | null
          company_name?: string | null
          created_at?: string
          email: string
          first_name?: string | null
          id?: string
          last_name?: string | null
          location?: string | null
          me_profile_completed?: boolean | null
          phone?: string | null
          revenue_contribution?: number | null
          rewards_tier?: string | null
          status?: string | null
          updated_at?: string
          user_class?: string | null
        }
        Update: {
          account_tier?: string | null
          company_name?: string | null
          created_at?: string
          email?: string
          first_name?: string | null
          id?: string
          last_name?: string | null
          location?: string | null
          me_profile_completed?: boolean | null
          phone?: string | null
          revenue_contribution?: number | null
          rewards_tier?: string | null
          status?: string | null
          updated_at?: string
          user_class?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      calculate_profile_completion: {
        Args: { profile_user_id: string }
        Returns: number
      }
      calculate_user_lifetime_value: {
        Args: { user_id: string }
        Returns: number
      }
      generate_affiliate_code: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      generate_profile_url_slug: {
        Args: { first_name: string; last_name: string }
        Returns: string
      }
      get_commission_rate: {
        Args: { user_tier: string; commission_type: string }
        Returns: number
      }
      get_conversion_metrics: {
        Args: Record<PropertyKey, never>
        Returns: Json
      }
      get_form_metrics: {
        Args: Record<PropertyKey, never>
        Returns: Json
      }
      get_quarterly_revenue_progress: {
        Args: Record<PropertyKey, never>
        Returns: Json
      }
      get_revenue_by_user_class: {
        Args: Record<PropertyKey, never>
        Returns: Json
      }
      get_revenue_forecasting: {
        Args: Record<PropertyKey, never>
        Returns: Json
      }
      get_sales_pipeline_metrics: {
        Args: Record<PropertyKey, never>
        Returns: Json
      }
    }
    Enums: {
      account_tier: "essential" | "standard" | "business_plus" | "partnership"
      profile_completion_status:
        | "incomplete"
        | "basic"
        | "complete"
        | "verified"
      user_class: "individual" | "business" | "social" | "partnership"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      account_tier: ["essential", "standard", "business_plus", "partnership"],
      profile_completion_status: [
        "incomplete",
        "basic",
        "complete",
        "verified",
      ],
      user_class: ["individual", "business", "social", "partnership"],
    },
  },
} as const
